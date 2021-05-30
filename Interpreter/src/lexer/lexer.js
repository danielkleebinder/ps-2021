import Token, { Tokens } from "./token.js";
import LexerError from "./lexer-error.js";
import Keywords from "./keywords.js";

let nameRegex = /[a-z]/;


class Lexer {

  #programCode = "";
  #cursorPosition = 0;


  // TODO: refactor methods to createName and createArrow so simplify code (maybe a move to an index-based loop is necessary)

  /**
   * Tokenizes the given input.
   * @param input A program code (type=string).
   * @returns Array of tokens.
   */
  tokenize(input) {
    this.#programCode = input;
    this.#cursorPosition = 0;

    const tokens = [];
    let char = null;

    while (this.#cursorPosition < this.#programCode.length) {
      char = this.#getCurrentChar();

      // Hey, we found a number, lets investigate further and check how large this number is
      // and if it spans over multiple characters.
      if (this.#isNumber(char)) {
        tokens.push(new Token(Tokens.INT, this.#tokenizeNumber()));
        continue;
      }

      // That's a variable name, but we have to be careful because it could be one of the
      // reserved keywords as well.
      if (this.#isName(char)) {
        tokens.push(this.#checkKeywords(this.#tokenizeName()));
        continue;
      }

      // We found an arrow operator (i.e. "->"). But this might be the prefix of a negative
      // number as well.
      if (this.#isArrow(char)) {
        tokens.push(this.#tokenizeArrow());
        continue;
      }

      // Nothing matched so far, test the other possibilities...
      if (char === "{") {
        tokens.push(new Token(Tokens.LSPAREN));
      } else if (char === "}") {
        tokens.push(new Token(Tokens.RSPAREN));
      } else if (char === "(") {
        tokens.push(new Token(Tokens.LRPAREN));
      } else if (char === ")") {
        tokens.push(new Token(Tokens.RRPAREN));
      } else if (char === ",") {
        tokens.push(new Token(Tokens.Comma));
      } else if (char === "=") {
        tokens.push(new Token(Tokens.Assign));
      }

      // ... and advance the cursor manually
      this.#advanceCursor();
    }

    return tokens;
  }

  /**
   * Uses the program code and the cursor position to tokenize a number.
   * @returns {number}
   */
  #tokenizeNumber() {
    let number = "";
    while (true) {
      const char = this.#getCurrentChar();
      if (!this.#isNumber(char)) {
        break;
      }
      number += char;
      this.#advanceCursor();
    }
    return Number.parseInt(number);
  }

  /**
   * Uses the program code and the cursor position to tokenize a name. Will return a
   * keyword token if a keyword matches.
   * @returns {string}
   */
  #tokenizeName() {
    let name = "";
    while (true) {
      const char = this.#getCurrentChar();
      if (!this.#isName(char)) {
        break;
      }
      name += char;
      this.#advanceCursor();
    }
    return name;
  }

  /**
   * Uses the program code and the cursor position to tokenize an arrow operator. Will return a
   * negative number (due to the prefix "-") or an arrow token.
   * @returns {Token}
   */
  #tokenizeArrow() {
    this.#advanceCursor();
    const char = this.#getCurrentChar();

    // Check for a syntactically correct arrow ->
    if (char === ">") {
      return new Token(Tokens.ARROW);
    }

    // Might be a negative integer
    if (this.#isNumber(char)) {
      return new Token(Tokens.NEGATE);
    }

    // Something went syntactically wrong
    throw new LexerError("Invalid negative number or arrow operator");
  }

  /**
   * Advances the cursor by the given amount of positions.
   * @param by Positions (defaults to 1).
   */
  #advanceCursor(by = 1) {
    this.#cursorPosition += by;
  }

  #getCurrentChar() {
    return this.#programCode.substr(this.#cursorPosition, 1);
  }

  #isNumber(char) {
    let number = Number.parseInt(char);
    return Number.isInteger(number);
  }

  #isName(char) {
    return nameRegex.test(char);
  }

  #isArrow(char) {
    return char === "-";
  }

  #checkKeywords(name) {
    if (name in Keywords) {
      return new Token(Keywords[name]);
    } else {
      return new Token(Tokens.NAME, name);
    }
  }
}

export default Lexer;
