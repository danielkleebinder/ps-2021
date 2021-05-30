import process from "../src/main";

test("should create static entry record: {a=1}", () => {
  const input = "{a=1}";
  const result = process(input);
  expect(result).toBe("<record create>");
});

test("should evaluate sub expressions in record: {a=1,b=mult(plus 3 2)5}", () => {
  const input = "{a=1,b=mult(plus 3 2)5}";
  const result = process(input);
  expect(result).toBe("<record create>");
});
