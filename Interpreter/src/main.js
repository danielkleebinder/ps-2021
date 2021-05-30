import Interpreter from "./interpreter/interpreter.js";
import Lexer from "./lexer/lexer.js";
import Parser from "./parser/parser.js";

const process = (input) => {
  console.log("Evaluating:", input);
  let lexer = new Lexer();
  let tokenized = lexer.tokenize(input);
  console.log("Tokens:", tokenized);

  let parser = new Parser();
  let ast = parser.parse(tokenized);
  console.log("AST:", ast);

  let interpreter = new Interpreter();
  let result = interpreter.interpret(ast);
  console.log("Result:", result);

  return result;
};

// let input = "1 2 plus -> ( ) { }";
process("plus 1 2");
process("minus 2 -3");
process("plus(mult 2 2)3");
process("cond 1 8");
process("cond (plus 0 1) 999");
process("{a=1}");
process("{a=1,b=10}");
process("{a=1,b=mult(plus 3 2)5}");
process("{a=1}a");
process("{" +
  "append = {head=10, tail=mult 10 5}," +
  "gen = (plus(mult(minus 5 1)2)3)" +
  "} gen append");
process("x -> x");
process("{x=1}x");
process("{a = x -> 1}a");

export default process;
