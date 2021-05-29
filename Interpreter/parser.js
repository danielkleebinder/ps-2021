import { Tokens } from "./token.js";
import { IntegerNode, BinaryOperationNode, BinaryOperations } from "./nodes.js";

class Parser {
  parse(tokens) {
    this.pos = -1;
    this.tokens = tokens;
    this.current_token = null;
    return this.evalExpr();
  }

  next() {
    if (this.hasNext()) {
      this.pos += 1;
      this.current_token = this.tokens[this.pos];
    }
    return this.current_token;
    // else TODO: Throw errow
  }

  hasNext() {
    return this.pos + 1 < this.tokens.length;
  }

  // -- Grammar --

  // <expr> ::= <apply>
  evalExpr() {
    return this.evalApply();
    // TODO: Not Implemented yet
  }

  // <apply> ::= <basic>
  evalApply() {
    return this.evalBasic();
    // TODO: Not Implemented yet
  }

  // <basic> ::= <integer>
  //           | <name> (Basic functions)
  evalBasic() {
    this.next();
    switch (this.current_token.type) {
      case Tokens.INT:
        return new IntegerNode(this.current_token.value);
      case Tokens.PLUS:
        let summand1 = this.evalBasic();
        let summand2 = this.evalBasic();
        return new BinaryOperationNode(
          summand1,
          summand2,
          BinaryOperations.PLUS
        );
      case Tokens.MINUS:
        let term1 = this.evalBasic();
        let term2 = this.evalBasic();
        return new BinaryOperationNode(term1, term2, BinaryOperations.MINUS);
      case Tokens.MULT:
        let factor1 = this.evalBasic();
        let factor2 = this.evalBasic();
        return new BinaryOperationNode(factor1, factor2, BinaryOperations.MULT);
      case Tokens.DIV:
        let dividend = this.evalBasic();
        let divisor = this.evalBasic();
        return new BinaryOperationNode(dividend, divisor, BinaryOperations.DIV);
    }
    // TODO: Throw error
    return null;
  }

  evalPairs() {
    // TODO: Not Implemented yet
  }
}

export default Parser;
