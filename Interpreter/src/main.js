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
process("{x=1}x");
process("{a = x -> 1} a 1");
process("{a = x -> x} a 3");
process("{a = x -> mult(plus 1 x) 3} a 3");
process("{ a = x -> x } a 3");
process("{}");
process("{ a = x -> x, b = x -> (mult(plus 1 x) a 5) } b 1");
process("{ a = x -> x, b = x -> cond x 2 3 } b(0)");
process("{ a = x -> x, b = x -> { res = a(x) } } b(999) res");
process("{ d=x->mult x x, v=d 2 } v");
process("{ a=x->y->add(mult x x)y, b=a 2, c=b 3 } c");

export default process;
