import process from "../src/main";

test("should evaluate to true: cond 1 999", () => {
  const input = "cond 1 999";
  const result = process(input);
  expect(result).toBe(999);
});

test("should evaluate to true: cond (plus 0 1) 999", () => {
  const input = "cond (plus 0 1) 999";
  const result = process(input);
  expect(result).toBe(999);
});

test("should evaluate to false: cond (minus 1 1) 999 666", () => {
  const input = "cond (minus 1 1) 999 666";
  const result = process(input);
  expect(result).toBe(666);
});

test("should evaluate to false: cond (minus(div 8 2) 4) 999 666", () => {
  const input = "cond (minus(div 8 2) 4) 999 666";
  const result = process(input);
  expect(result).toBe(666);
});

test("should evaluate if case: cond 1 (minus(div 8 2) 3)", () => {
  const input = "cond 1 (minus(div 8 2) 3)";
  const result = process(input);
  expect(result).toBe(1);
});

test("should evaluate else case: cond 0 (999) (plus(mult 2 3) 4)", () => {
  const input = "cond 0 (999) (plus(mult 2 3) 4)";
  const result = process(input);
  expect(result).toBe(10);
});
