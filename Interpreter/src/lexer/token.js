const Tokens = {
  NAME: "VAR",        // [a-z]+
  INT: "INT",         // 0-9
  NEGATE: "NEGATE",   // -
  ARROW: "ARROW",     // ->
  LRPAREN: "LRPAREN", // (
  RRPAREN: "RRPAREN", // )
  LSPAREN: "LSPAREN", // {
  RSPAREN: "RSPAREN", // }
  COMMA: "COMMA",     // ,
  PLUS: "PLUS",       // Addition (e.g. plus 2 2)
  MINUS: "MINUS",     // Subtraction (e.g. sub 3 1)
  MULT: "MULT",       // Multiplication (e.g. mult 2 3)
  DIV: "DIV",         // Division (e.g. div 4 2)
  Cond: "COND",       // Condition (e.g. cond a b c)
};

class Token {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }
}

export default Token;
export { Tokens };
