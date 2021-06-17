const Tokens = {
  Integer: "INT",     // 0-9
  Negate: "NEGATE",   // -
  Name: "VAR",        // [a-z]+
  LRPAREN: "LRPAREN", // (
  RRPAREN: "RRPAREN", // )
  LSPAREN: "LSPAREN", // {
  RSPAREN: "RSPAREN", // }
  Plus: "PLUS",       // Addition (e.g. plus 2 2)
  Minus: "MINUS",     // Subtraction (e.g. sub 3 1)
  Mult: "MULT",       // Multiplication (e.g. mult 2 3)
  Div: "DIV",         // Division (e.g. div 4 2)
  Cond: "COND",       // Condition (e.g. cond a b c),
  Arrow: "ARROW",     // ->
  Comma: "COMMA",     // Comma is used to separate function parameters
  Assign: "ASSIGN",   // Assign is used to set properties of records "="
};

const BasicTokens = [
  Tokens.Integer,
  Tokens.Negate,
  Tokens.Name,
  Tokens.LRPAREN,
  Tokens.RRPAREN,
  Tokens.LSPAREN,
  Tokens.RSPAREN,
  Tokens.Plus,
  Tokens.Minus,
  Tokens.Mult,
  Tokens.Div,
  Tokens.Cond,
  Tokens.Assign,
];

class Token {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }
}

export default Token;
export { Token, BasicTokens, Tokens };
