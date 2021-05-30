import process from "../src/main";

test("plus 1 2 should be 3", () => {
  const input = "plus 1 2";
  const result = process(input);
  expect(result).toBe(3);
});

test("minus 2 -3 should be 5", () => {
  const input = "minus 2 -3";
  const result = process(input);
  expect(result).toBe(5);
});

test("plus(mult 2 2) 3 should be 7", () => {
  const input = "plus(mult 2 2) 3";
  const result = process(input);
  expect(result).toBe(7);
});
