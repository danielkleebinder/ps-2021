/**
 * The lexer will throw lexer errors if a given program code cannot be tokenized.
 */
class LexerError extends Error {
  constructor(...params) {
    super(...params);
  }
}

export default LexerError;
