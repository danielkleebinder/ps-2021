import Lexer from "./lexer.js";

let input = "1 2 add -> ( ) { }";

let lexer = new Lexer();
let result = lexer.tokenize(input);
console.log(result);
