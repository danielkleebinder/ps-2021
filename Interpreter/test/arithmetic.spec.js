import process from "../src/main";

test("should output 3 for plus 1 2", () => {
  const input = "plus 1 2";
  const result = process(input);
  expect(result).toBe(3);
});

test("should output 5 for minus 2 -3", () => {
  const input = "minus 2 -3";
  const result = process(input);
  expect(result).toBe(5);
});

test("should output 7 for plus(mult 2 2) 3", () => {
  const input = "plus(mult 2 2) 3";
  const result = process(input);
  expect(result).toBe(7);
});

test("should output 1 for minus(div 8 2) 3", () => {
  const input = "minus(div 8 2) 3";
  const result = process(input);
  expect(result).toBe(1);
});
