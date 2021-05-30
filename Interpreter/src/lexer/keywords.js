import { Tokens } from "./token.js";


// TODO: Maybe move the keywords to the parser and only save them here as names
// because currently the generated tokens do not match the EBNF
const Keywords = {
  plus: Tokens.PLUS,
  minus: Tokens.MINUS,
  mult: Tokens.MULT,
  div: Tokens.DIV,
  cond: "COND",
};

export default Keywords;
