import ParserError from "./parser-error.js";
import { BasicTokens, Tokens } from "../lexer/token.js";
import {
  AccessNode,
  AssignNode,
  BinaryOperationNode,
  BinaryOperations,
  ConditionNode,
  FunctionCallNode,
  FunctionNode,
  IntegerNode,
  PairsNode,
  RecordNode,
  RootNode,
  UnaryOperationNode,
  UnaryOperations,
} from "./nodes.js";
import { inlineFunctionArgument } from "../optimizer/optimizer.js";


/**
 * The parser uses the alphabet of defined tokens to create an AST.
 */
class Parser {

  #position = -1;
  #tokens = [];
  #currentToken = null;

  #functionTable = [];
  #functionLookAheadTable = [];

  /**
   * Parses the given tokens and returns an abstract syntax tree as result.
   * @param tokens Tokens.
   * @returns {RootNode}
   */
  parse(tokens) {
    this.#position = -1;
    this.#tokens = tokens;
    this.#currentToken = null;

    this.#functionTable = [];
    this.#functionLookAheadTable = [];

    const statements = [];
    while (this.#hasNext()) {
      statements.push(this.#evalExpr());
    }
    return new RootNode(statements);
  }

  /**
   * Steps to the next token.
   * @returns {Token}
   */
  #next() {
    if (this.#hasNext()) {
      this.#position += 1;
      this.#currentToken = this.#tokens[this.#position];
    } else {
      this.#currentToken = null;
    }
    return this.#currentToken;
  }

  /**
   * Peeks the next token at position n.
   * @param n Next token position (defaults to 1).
   * @returns {Token}
   */
  #peekNext(n = 1) {
    return this.#tokens[this.#position + n];
  }

  #hasNext() {
    return this.#position + 1 < this.#tokens.length;
  }

  // -- Grammar --

  // <expr> ::= <apply>
  //          | <name> ’->’ <expr>
  #evalExpr() {
    // <name> ’->’ <expr>
    this.#next();
    if (this.#currentToken?.type === Tokens.Name && this.#peekNext()?.type === Tokens.Arrow) {
      const argumentName = this.#currentToken.value;
      this.#next();
      const body = this.#evalExpr();
      return new FunctionNode(argumentName, body);
    }

    // <apply>
    return this.#evalApply();
  }

  // <apply> ::= <basic>
  //           | <apply> <basic>
  #evalApply() {
    // <apply> <basic>
    if (!BasicTokens.includes(this.#currentToken?.type) && this.#currentToken != null) {
      return this.#evalApply();
    }

    // <basic>
    return this.#evalBasic();
  }

  // <basic> ::= <integer>
  //           | <name>(<basic?>)
  //           | ( <expr> )
  //           | { [<pairs>] }
  #evalBasic(doStep = false) {
    if (doStep) {
      this.#next();
    }
    if (this.#currentToken == null) {
      return null;
    }
    switch (this.#currentToken.type) {
      case Tokens.Integer:
        return new IntegerNode(this.#currentToken.value);
      case Tokens.Name:
        const accessName = this.#currentToken.value;
        if (this.#functionLookAheadTable[accessName]) {
          return new FunctionCallNode(accessName, this.#evalBasic(true));
        }
        return new AccessNode(accessName);
      case Tokens.Plus:
        const summand1 = this.#evalBasic(true);
        const summand2 = this.#evalBasic(true);
        return new BinaryOperationNode(summand1, summand2, BinaryOperations.PLUS);
      case Tokens.Minus:
        const term1 = this.#evalBasic(true);
        const term2 = this.#evalBasic(true);
        return new BinaryOperationNode(term1, term2, BinaryOperations.MINUS);
      case Tokens.Mult:
        const factor1 = this.#evalBasic(true);
        const factor2 = this.#evalBasic(true);
        return new BinaryOperationNode(factor1, factor2, BinaryOperations.MULT);
      case Tokens.Div:
        const dividend = this.#evalBasic(true);
        const divisor = this.#evalBasic(true);
        return new BinaryOperationNode(dividend, divisor, BinaryOperations.DIV);
      case Tokens.Negate:
        const num = this.#evalBasic(true);
        return new UnaryOperationNode(num, UnaryOperations.NEGATE);
      case Tokens.Cond:
        const condition = this.#evalBasic(true);
        const ifCase = this.#evalBasic(true);
        const elseCase = this.#evalBasic(true);
        return new ConditionNode(condition, ifCase, elseCase);
      case Tokens.LRPAREN:
        const evaluationResult = this.#evalExpr();
        if (!this.#hasNext() || this.#next().type !== Tokens.RRPAREN) {
          throw new ParserError("No closing parenthesis found");
        }
        return evaluationResult;
      case Tokens.LSPAREN:
        const record = new RecordNode(this.#evalPairs());
        if (this.#currentToken.type !== Tokens.RSPAREN) {
          throw new ParserError(`Record definition not closed at ${this.#position}. Symbol was ${JSON.stringify(this.#currentToken)}`);
        }
        return record;
    }
    throw new ParserError(`Evaluation of ${JSON.stringify(this.#currentToken)} is not possible`);
  }

  // <pairs> ::= <name> = <expr>
  //           | <pairs> ’,’ <name> = <expr>
  #evalPairs() {
    this.#next();
    const result = new PairsNode();
    while (this.#currentToken.type === Tokens.Comma || this.#currentToken.type === Tokens.Name) {
      if (this.#currentToken.type === Tokens.Comma) {
        this.#next();
      }
      const name = this.#currentToken.value;
      this.#next();

      // A function look ahead table is used to keep track of function definitions
      // and allow for functions to call themselves.
      if (this.#peekNext()?.type === Tokens.Name && this.#peekNext(2)?.type === Tokens.Arrow) {
        console.log(name);
        this.#functionLookAheadTable[name] = true;
      }

      let expr = this.#evalExpr();

      // Directly rewrite and inline functions if possible:
      //   In general, expressions are always executed as far as possible.
      //   For example, in {a=x->y->add(mult x x)y, b=a 2, c=b 3} the value
      //   of a is the whole function, the value of b is y->add(mult 2 2)y
      //   (or y->add 4 y if you want to apply optimizations), and the value
      //   of c is 7.
      if (expr instanceof FunctionCallNode && this.#functionTable[expr.name] != null) {
        const fn = this.#functionTable[expr.name];
        expr = inlineFunctionArgument(fn, expr.argument);
      }

      // It's a function definition. Place it inside the function table to find it
      // for function rewrites and function calls later.
      if (expr instanceof FunctionNode) {
        this.#functionTable[name] = expr;
        this.#functionLookAheadTable[name] = true;
      }

      result.pairs.push(new AssignNode(name, expr));
      this.#next();
    }
    return result;
  }
}

export default Parser;
