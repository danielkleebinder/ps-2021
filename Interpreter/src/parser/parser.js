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

class Parser {

  #position = -1;
  #tokens = [];
  #currentToken = null;
  #functionTable = [];

  parse(tokens) {
    this.#position = -1;
    this.#tokens = tokens;
    this.#currentToken = null;
    this.#functionTable = [];

    const statements = [];
    while (this.#hasNext()) {
      statements.push(this.#evalExpr());
    }
    return new RootNode(statements);
  }

  #next() {
    if (this.#hasNext()) {
      this.#position += 1;
      this.#currentToken = this.#tokens[this.#position];
    } else {
      this.#currentToken = null;
    }
    return this.#currentToken;
  }

  #peekNext() {
    return this.#tokens[this.#position + 1];
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
        if (this.#functionTable[accessName] != null) {
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
          throw new ParserError(`Record definition not closed. Symbol was ${JSON.stringify(this.#currentToken)}`);
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
      const expr = this.#evalExpr();
      if (expr instanceof FunctionNode) {
        this.#functionTable[name] = expr;
      }
      result.pairs.push(new AssignNode(name, expr));
      this.#next();
    }
    return result;
  }
}

export default Parser;
