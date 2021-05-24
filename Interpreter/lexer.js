import Token, { Tokens } from "./token.js"

class Lexer {

    tokenize(input) {
        let tokens = []
        var creationMode = false

        for (let char of input) {
            if (creationMode) { // Decision between - and ->
                if (char === '>') {
                    tokens.push(new Token(Tokens.ARROW))
                } else {
                    tokens.push(new Token(Tokens.MINUS))
                }
                creationMode = false;
            }
            else if (char === '-') {
                creationMode = true
            }
            else if (char === '+') {
                tokens.push(new Token(Tokens.PLUS))
            } 
            else if (this.isNumber(char)) {
                tokens.push(new Token(Tokens.INT, Number.parseInt(char)))
            } 
            else if (char === '{') {
                tokens.push(new Token(Tokens.LSPAREN))
            } 
            else if (char === '}') {
                tokens.push(new Token(Tokens.RSPAREN))
            }
            else if (char === '(') {
                tokens.push(new Token(Tokens.LRPAREN))
            } 
            else if (char === ')') {
                tokens.push(new Token(Tokens.RRPAREN))
            }
            else if (char === ',') {
                tokens.push(new Token(Tokens.COMMA))
            }
        }

        return tokens
    }

    isNumber(char) {
        let number = Number.parseInt(char)
        return Number.isInteger(number)
    }
}

export default Lexer;