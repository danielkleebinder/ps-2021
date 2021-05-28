const Tokens = {
  NAME: "VAR", // [a-z]+
  INT: "INT", // 0-9
  ARROW: "ARROW", // ->
  LRPAREN: "LRPAREN", // (
  RRPAREN: "RRPAREN", // )
  LSPAREN: "LSPAREN", // {
  RSPAREN: "RSPAREN", // }
  COMMA: "COMMA", // ,
};

class Token {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }
}

export default Token;
export { Tokens };
