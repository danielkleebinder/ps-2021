import Lexer from "../src/lexer";
import { Tokens } from "../src/token";

let lexer = null;
beforeEach(() => lexer = new Lexer());

test("tokenize plus operator", () => {
  const input = "plus 1 2";
  const tokens = lexer.tokenize(input);
  expect(tokens.length).toBe(3);
  expect(tokens[0]).toEqual({ type: Tokens.PLUS, value: null });
  expect(tokens[1]).toEqual({ type: Tokens.INT, value: 1 });
  expect(tokens[2]).toEqual({ type: Tokens.INT, value: 2 });
});
