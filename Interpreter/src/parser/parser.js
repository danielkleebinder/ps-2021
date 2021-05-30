import ParserError from "./parser-error.js";
import { Tokens } from "../lexer/token.js";
import {
  AccessNode,
  AssignNode,
  BinaryOperationNode,
  BinaryOperations,
  ConditionNode,
  FunctionCallNode,
  FunctionNode,
  IntegerNode,
  RecordNode,
  RootNode,
  UnaryOperationNode,
  UnaryOperations,
} from "./nodes.js";

class Parser {

  #position = -1;
  #tokens = [];
  #currentToken = null;

  parse(tokens) {
    this.#position = -1;
    this.#tokens = tokens;
    this.#currentToken = null;

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
  #evalExpr() {
    return this.#evalApply();
  }

  // <apply> ::= <basic>
  #evalApply() {
    return this.#evalBasic();
  }

  // <basic> ::= <integer>
  //           | <name> (Basic functions)
  //           | ( <expr> )
  #evalBasic() {
    this.#next();
    if (this.#currentToken == null) {
      return null;
    }
    switch (this.#currentToken.type) {
      case Tokens.INT:
        return new IntegerNode(this.#currentToken.value);
      case Tokens.NAME:
        return this.#evalName();
      case Tokens.PLUS:
        const summand1 = this.#evalBasic();
        const summand2 = this.#evalBasic();
        return new BinaryOperationNode(summand1, summand2, BinaryOperations.PLUS);
      case Tokens.MINUS:
        const term1 = this.#evalBasic();
        const term2 = this.#evalBasic();
        return new BinaryOperationNode(term1, term2, BinaryOperations.MINUS);
      case Tokens.MULT:
        const factor1 = this.#evalBasic();
        const factor2 = this.#evalBasic();
        return new BinaryOperationNode(factor1, factor2, BinaryOperations.MULT);
      case Tokens.DIV:
        const dividend = this.#evalBasic();
        const divisor = this.#evalBasic();
        return new BinaryOperationNode(dividend, divisor, BinaryOperations.DIV);
      case Tokens.NEGATE:
        const num = this.#evalBasic();
        return new UnaryOperationNode(num, UnaryOperations.NEGATE);
      case Tokens.Cond:
        const condition = this.#evalBasic();
        const ifCase = this.#evalBasic();
        const elseCase = this.#evalBasic();
        return new ConditionNode(condition, ifCase, elseCase);
      case Tokens.LRPAREN:
        const evaluationResult = this.#evalExpr();
        if (!this.#hasNext() || this.#next().type !== Tokens.RRPAREN) {
          throw new ParserError("No closing parenthesis found");
        }
        return evaluationResult;
      case Tokens.LSPAREN:
        const record = this.#evalPairs();
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
    const properties = [];
    do {
      this.#next();
      properties.push(this.#evalName());
    } while (this.#hasNext() && this.#next().type === Tokens.Comma);
    return new RecordNode(properties);
  }

  #evalName() {
    const name = this.#currentToken.value;

    switch (this.#peekNext()?.type) {
      case Tokens.Assign:
        this.#next();
        const expr = this.#evalExpr();
        return new AssignNode(name, expr);
      case Tokens.ARROW:
        this.#next();
        const argumentName = name;
        const body = this.#evalExpr();
        return new FunctionNode(argumentName, body);
      case Tokens.LRPAREN:
        this.#next();
        const parameter = this.#evalBasic();
        if (this.#hasNext() && this.#next().type !== Tokens.RRPAREN) {
          throw new ParserError("Function call not closed");
        }
        return new FunctionCallNode(name, parameter);
    }

    // Standalone names are access identifiers
    return new AccessNode(name);
  }
}

export default Parser;
