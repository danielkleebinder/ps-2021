import Token, { Tokens } from "./token.js";

let nameRegex = /[a-z]/;

let keywords = {
  plus: Tokens.PLUS,
  minus: Tokens.MINUS,
  mult: Tokens.MULT,
  div: Tokens.DIV,
};

class Lexer {
  // TODO: refactor methods to createName and createArrow so simplify code (maybe a move to an index-based loop is necessary)
  tokenize(input) {
    let tokens = [];
    var arrowMode = false;
    var nameMode = false;
    var tempName = "";

    for (let char of input) {
      if (nameMode) {
        if (nameRegex.test(char)) {
          tempName = tempName.concat(char);
        } else {
          // Name is complete
          // TODO: save as variable
          tokens.push(this.checkKeywords(tempName));
          nameMode = false;
          tempName = "";
        }
        continue;
      }

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
      } else if (nameRegex.test(char)) {
        nameMode = true;
        tempName = tempName.concat(char);
      }
    }

    return tokens;
  }

  isNumber(char) {
    let number = Number.parseInt(char);
    return Number.isInteger(number);
  }

  checkKeywords(name) {
    if (name in keywords) {
      return new Token(keywords[name]);
    } else {
      return new Token(Tokens.NAME, name);
    }
  }
}

export default Lexer;
