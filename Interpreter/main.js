import Interpreter from "./interpreter.js";
import Lexer from "./lexer.js";
import Parser from "./parser.js";

// let input = "1 2 plus -> ( ) { }";
let input = "plus 1 2";

let lexer = new Lexer();
let tokenized = lexer.tokenize(input);
console.log("Tokens:", tokenized);

let parser = new Parser();
let ast = parser.parse(tokenized);
console.log("AST:", ast);

let interpreter = new Interpreter();
let result = interpreter.interpret(ast);

console.log("Result:", result);
