import process from "../src/main";

test("should interpret simple lambda function: { a = x -> 1 } a(100)", () => {
  const input = "{ a = x -> 1 } a(100)";
  const result = process(input);
  expect(result).toEqual(["<record create>", 1]);
});

test("should interpret parameter: { a = x -> x } a(3)", () => {
  const input = "{ a = x -> x } a(3)";
  const result = process(input);
  expect(result).toEqual(["<record create>", 3]);
});

test("should execute built in functions: { a = x -> mult(plus 1 x) 3 } a(3)", () => {
  const input = "{ a = x -> mult(plus 1 x) 3 } a(3)";
  const result = process(input);
  expect(result).toEqual(["<record create>", 12]);
});

test("should be able to use parenthesis in function", () => {
  const input = "{ a = x -> x, b = x -> (mult x x) } b(2)";
  const result = process(input);
  expect(result).toEqual(["<record create>", 4]);
});

test("should execute function with condition", () => {
  const input = "{ a = x -> x, b = x -> cond x a(x) 666 } b(999)";
  const result = process(input);
  expect(result).toEqual(["<record create>", 999]);
});

test("should execute other record functions: { a = x -> x, b = x -> mult(plus 1 x) a(5) } b(2)", () => {
  const input = "{ a = x -> x, b = x -> mult(plus 1 x) a(5) } b(2)";
  const result = process(input);
  expect(result).toEqual(["<record create>", 15]);
});

test("should not be able to access out of scope variables", () => {
  const input = "{ a = x -> { res = x } } a(5) res";
  const result = process(input);
  expect(result.length).not.toEqual(3);
  expect(result).toEqual(["<record create>", "<record create>"]);
});

test("should evaluate record functions: { d=x->mult x x, v=d 2 } v", () => {
  const input = "{ d=x->mult x x, v=d 2 } v";
  const result = process(input);
  expect(result.length).toEqual(2);
  expect(result).toEqual(["<record create>", 4]);
});

test("should auto rewrite record functions: { a=x->y->mult x y, b=a 2, c=b 3 } c", () => {
  const input = "{ a=x->y->mult x y, b=a 2, c=b 3 } c";
  const result = process(input);
  expect(result.length).toEqual(2);
  expect(result).toEqual(["<record create>", 6]);
});

test("should evaluate record functions as far as possible: { a=x->y->add(mult x x)y, b=a 2, c=b 3 } c", () => {
  const input = "{ a=x->y->add(mult x x)y, b=a 2, c=b 3 } c";
  const result = process(input);
  expect(result.length).toEqual(2);
  expect(result).toEqual(["<record create>", 4]);
});
