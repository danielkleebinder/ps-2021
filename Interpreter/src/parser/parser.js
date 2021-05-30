import ParserError from "./parser-error.js";
import { Tokens } from "../lexer/token.js";
import {
  AccessNode,
  AssignNode,
  BinaryOperationNode,
  BinaryOperations,
  ConditionNode,
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

  #hasNext() {
    return this.#position + 1 < this.#tokens.length;
  }

  // -- Grammar --

  // <expr> ::= <apply>
  #evalExpr() {
    return this.#evalApply();
    // TODO: Not Implemented yet
  }

  // <apply> ::= <basic>
  #evalApply() {
    return this.#evalBasic();
    // TODO: Not Implemented yet
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
        return new AccessNode(this.#currentToken.value);
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
          throw new ParserError("Record definition not closed");
        }
        return record;
    }
    throw new ParserError(`Evaluation of ${JSON.stringify(this.#currentToken)} is not possible`);
  }

  // <pairs> ::= <name> = <expr>
  //           | <pairs> ’,’ <name> = <expr>
  #evalPairs() {
    this.#next();
    const properties = [];
    while (this.#currentToken.type === Tokens.NAME || this.#currentToken.type === Tokens.Comma) {
      if (this.#currentToken.type === Tokens.Comma) {
        this.#next();
      }
      const name = this.#currentToken.value;

      // There was no assign statement (e.g. a = 3)
      if (!this.#hasNext() || this.#next().type !== Tokens.Assign) {
        throw new ParserError("Invalid pair");
      }

      const expr = this.#evalExpr();
      properties.push(new AssignNode(name, expr));
      this.#next();
    }
    return new RecordNode(properties);
  }
}

export default Parser;
