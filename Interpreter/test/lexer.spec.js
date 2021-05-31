import Lexer from "../src/lexer/lexer";
import { Tokens } from "../src/lexer/token";

let lexer = null;
beforeEach(() => lexer = new Lexer());

test("should tokenize plus operator", () => {
  const input = "plus 1 2";
  const tokens = lexer.tokenize(input);
  expect(tokens.length).toBe(3);
  expect(tokens[0]).toEqual({ type: Tokens.Plus, value: null });
  expect(tokens[1]).toEqual({ type: Tokens.Integer, value: 1 });
  expect(tokens[2]).toEqual({ type: Tokens.Integer, value: 2 });
});

test("should tokenize large number", () => {
  const input = "8472412";
  const tokens = lexer.tokenize(input);
  expect(tokens.length).toBe(1);
  expect(tokens[0]).toEqual({ type: Tokens.Integer, value: 8472412 });
});

test("should tokenize negative numbers", () => {
  const input = "-17";
  const tokens = lexer.tokenize(input);
  expect(tokens.length).toBe(2);
  expect(tokens[0]).toEqual({ type: Tokens.Negate, value: null });
  expect(tokens[1]).toEqual({ type: Tokens.Integer, value: 17 });
});
