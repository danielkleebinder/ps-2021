import Lexer from "./lexer.js";
import Parser from "./parser.js";

let input = "1 2 add -> ( ) { }";

let lexer = new Lexer();
let tokenized = lexer.tokenize(input);

let parser = new Parser();
let result = parser.parse(tokenized);

console.log(result);
