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
    var node;
    if (this.current_token.type === Tokens.INT) {
      node = new IntegerNode(this.current_token.value);
    } else if (this.current_token.type === Tokens.PLUS) {
      let summand1 = this.evalBasic();
      let summand2 = this.evalBasic();
      node = new BinaryOperationNode(summand1, summand2, BinaryOperations.PLUS);
    }
    return node;
  }

  evalPairs() {
    // TODO: Not Implemented yet
  }
}

export default Parser;
