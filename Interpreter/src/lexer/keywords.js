import { Tokens } from "./token.js";


// TODO: Maybe move the keywords to the parser and only save them here as names
// because currently the generated tokens do not match the EBNF
const Keywords = {
  plus: Tokens.Plus,
  minus: Tokens.Minus,
  mult: Tokens.Mult,
  div: Tokens.Div,
  cond: Tokens.Cond,
};

export default Keywords;
