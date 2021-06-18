import Interpreter from "./interpreter/interpreter.js";
import Lexer from "./lexer/lexer.js";
import Parser from "./parser/parser.js";


/**
 * Run the process function to evaluate some program code.
 * @param input Program code.
 * @param debugDetails If true, additional debug details will be print out.
 * @returns {*}
 */
const process = (input, debugDetails = true) => {
  if (debugDetails) {
    console.log("Evaluating:", input);
  }
  let lexer = new Lexer();
  let tokenized = lexer.tokenize(input);
  if (debugDetails) {
    console.log("Tokens:", tokenized);
  }

  let parser = new Parser();
  let ast = parser.parse(tokenized);
  if (debugDetails) {
    console.log("AST:", ast);
  }

  let interpreter = new Interpreter();
  let result = interpreter.interpret(ast);
  if (debugDetails) {
    console.log("Result:", result);
  }

  return result;
};

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
process("{ a = x -> x, b = x -> mult(plus 1 x) a(5) } b 2");
process("{ a = x -> x, b = x -> cond x 2 3 } b(0)");
process("{ a = x -> x, b = x -> { res = a(x) } } b(999) res");
process("{ d=x->mult x x, v=d 2 } v");
process("{ a=x->y->mult x y, b=a 2, c=b 3 } c");
process("{ a=x->y->plus(mult x x)y, b=a 2, c=b 3 } c");
process("{a=x->y->plus(mult x x)y, b=a 2, c=b 3}minus(b 5)c");
process("{a=x->{head=a head}}a");
process("{ a = x -> mult x x, b = y -> a y } b 10");

// process("{append = x->y->cond x {head=x head, tail=append(x tail)y} y, gen = x->cond x (append(gen(minus x 1)) {head=x, tail={}}) {}} gen 3");

export default process;
