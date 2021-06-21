import Interpreter from "./interpreter/interpreter.js";
import Lexer from "./lexer/lexer.js";
import Parser from "./parser/parser.js";

/**
 * Run the processInput function to evaluate some program code.
 * @param input Program code.
 * @param debugDetails If true, additional debug details will be print out.
 * @returns {*}
 */
const processInput = (input, debugDetails = false) => {
  console.log("Evaluating:", input);
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
  } else {
    if (result instanceof Array) {
      console.log("Result:", result[result.length -1])
    } else {
      console.log("Result:", result);
    }
  }

  return result;
};

export default processInput;
