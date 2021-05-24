const Tokens = {
    INT:'INT', // 0-9
    PLUS: 'PLUS', // +
    MINUS: 'MINUS', // - 
    ARROW: 'ARROW', // ->
    LRPAREN: 'LRPAREN', // (
    RRPAREN: 'RRPAREN', // )
    LSPAREN: 'LSPAREN', // {
    RSPAREN: 'RSPAREN', // }
    COMMA: 'COMMA' // ,
}

class Token {
    constructor(type, value=null) {
        this.type = type
        this.value = value
    }
}

export default Token;
export { Tokens };