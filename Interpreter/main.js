import Interpreter from "./interpreter.js";
import Lexer from "./lexer.js";
import Parser from "./parser.js";

let input = "1 2 add -> ( ) { }";

let lexer = new Lexer();
let tokenized = lexer.tokenize(input);

let parser = new Parser();
let ast = parser.parse(tokenized);

let interpreter = new Interpreter();
let result = interpreter.interpret(ast);

console.log(result);
