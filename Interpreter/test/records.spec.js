import process from "../src/main";

test("should handle empty records: { }", ()=>{
  const input = "{ }";
  const result = process(input);
  expect(result).toEqual("<record create>");
});

test("should create static entry record: {a=1}", () => {
  const input = "{a=1}";
  const result = process(input);
  expect(result).toBe("<record create>");
});

test("should access record variables: {a=2,b=10}a", () => {
  const input = "{a=2,b=10}a";
  const result = process(input);
  expect(result).toEqual(["<record create>", 2]);
});

test("should evaluate sub expressions in record: {a=1,b=mult(plus 3 2)5}", () => {
  const input = "{a=1,b=mult(plus 3 2)5}b";
  const result = process(input);
  expect(result).toEqual(["<record create>", 25]);
});
