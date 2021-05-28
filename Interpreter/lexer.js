import Token, { Tokens } from "./token.js";

class Lexer {
  tokenize(input) {
    let tokens = [];
    var arrowMode = false;

    for (let char of input) {
      if (arrowMode) {
        // Check for a syntactically correct arrow ->
        if (char === ">") {
          tokens.push(new Token(Tokens.ARROW));
        } else {
          //TODO: throw error
        }
        arrowMode = false;
      } else if (char === "-") {
        arrowMode = true;
      } else if (this.isNumber(char)) {
        tokens.push(new Token(Tokens.INT, Number.parseInt(char)));
      } else if (char === "{") {
        tokens.push(new Token(Tokens.LSPAREN));
      } else if (char === "}") {
        tokens.push(new Token(Tokens.RSPAREN));
      } else if (char === "(") {
        tokens.push(new Token(Tokens.LRPAREN));
      } else if (char === ")") {
        tokens.push(new Token(Tokens.RRPAREN));
      } else if (char === ",") {
        tokens.push(new Token(Tokens.COMMA));
      }
    }

    return tokens;
  }

  isNumber(char) {
    let number = Number.parseInt(char);
    return Number.isInteger(number);
  }
}

export default Lexer;
