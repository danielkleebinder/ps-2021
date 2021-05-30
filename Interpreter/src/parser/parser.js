import { Tokens } from "../lexer/token.js";
import { BinaryOperationNode, BinaryOperations, IntegerNode, UnaryOperationNode, UnaryOperations } from "./nodes.js";
import ParserError from "./parser-error.js";

class Parser {

  #position = -1;
  #tokens = [];
  #currentToken = null;

  parse(tokens) {
    this.#position = -1;
    this.#tokens = tokens;
    this.#currentToken = null;
    return this.#evalExpr();
  }

  #next() {
    if (this.#hasNext()) {
      this.#position += 1;
      this.#currentToken = this.#tokens[this.#position];
    }
    return this.#currentToken;
    // else TODO: Throw errow
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
    switch (this.#currentToken.type) {
      case Tokens.INT:
        return new IntegerNode(this.#currentToken.value);
      case Tokens.PLUS:
        let summand1 = this.#evalBasic();
        let summand2 = this.#evalBasic();
        return new BinaryOperationNode(
          summand1,
          summand2,
          BinaryOperations.PLUS,
        );
      case Tokens.MINUS:
        let term1 = this.#evalBasic();
        let term2 = this.#evalBasic();
        return new BinaryOperationNode(term1, term2, BinaryOperations.MINUS);
      case Tokens.MULT:
        let factor1 = this.#evalBasic();
        let factor2 = this.#evalBasic();
        return new BinaryOperationNode(factor1, factor2, BinaryOperations.MULT);
      case Tokens.DIV:
        let dividend = this.#evalBasic();
        let divisor = this.#evalBasic();
        return new BinaryOperationNode(dividend, divisor, BinaryOperations.DIV);
      case Tokens.NEGATE:
        let num = this.#evalBasic();
        return new UnaryOperationNode(num, UnaryOperations.NEGATE);
      case Tokens.LRPAREN:
        let result = this.#evalExpr();
        if (this.#next().type !== Tokens.RRPAREN) {
          throw new ParserError("No closing parenthesis found");
        }
        return result;
    }
    throw new ParserError(`Evaluation of ${JSON.stringify(this.#currentToken)} is not possible`);
  }

  #evalPairs() {
    // TODO: Not Implemented yet
  }
}

export default Parser;
