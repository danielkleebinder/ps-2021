import parseArgs from "minimist";
import processInput from "./main.js";

const args = parseArgs(process.argv);
const debug = args["v"] || args['verbose'];

if (args["d"] || args["demo"]) {
  processInput("plus 1 2", debug);
  processInput("minus 2 -3", debug);
  processInput("plus(mult 2 2)3", debug);
  processInput("cond 1 8", debug);
  processInput("cond (plus 0 1) 999", debug);
  processInput("{a=1}", debug);
  processInput("{a=1,b=10}", debug);
  processInput("{a=1,b=mult(plus 3 2)5}", debug);
  processInput("{x=1}x", debug);
  processInput("{a = x -> 1} a 1", debug);
  processInput("{a = x -> x} a 3", debug);
  processInput("{a = x -> mult(plus 1 x) 3} a 3", debug);
  processInput("{ a = x -> x } a 3", debug);
  processInput("{}", debug);
  processInput("{ a = x -> x, b = x -> mult(plus 1 x) a(5) } b 2", debug);
  processInput("{ a = x -> x, b = x -> cond x 2 3 } b(0)", debug);
  processInput("{ a = x -> x, b = x -> { res = a(x) } } b(999) res", debug);
  processInput("{ d=x->mult x x, v=d 2 } v", debug);
  processInput("{ a=x->y->mult x y, b=a 2, c=b 3 } c", debug);
  processInput("{ a=x->y->plus(mult x x)y, b=a 2, c=b 3 } c", debug);
  processInput("{a=x->y->plus(mult x x)y, b=a 2, c=b 3}minus(b 5)c", debug);
  processInput("{a=x->{head=a head}}a", debug);
  processInput("{ a = x -> mult x x, b = y -> a y } b 10", debug);
} else {
  if (!args['_'][2]) {
    console.log("Missing expression");
    console.log("Usage: interpreter [--demo] | \"<expression>\"");
    process.exit(128)
  }
  processInput(args['_'][2], debug)
}