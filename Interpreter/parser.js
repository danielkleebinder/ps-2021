import { Tokens } from "./token.js";
import { IntegerNode } from "./nodes.js";

class Parser {
  parse(tokens) {
    this.pos = -1;
    this.tokens = tokens;
    this.current_token = null;
    this.next();
    return this.evalExpr();
  }

  next() {
    if (this.hasNext()) {
      this.pos += 1;
      this.current_token = this.tokens[this.pos];
    }
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
  evalBasic() {
    if (this.current_token.type === Tokens.INT) {
      return new IntegerNode(this.current_token.value);
    }
    this.next();
  }

  evalPairs() {
    // TODO: Not Implemented yet
  }
}

export default Parser;
