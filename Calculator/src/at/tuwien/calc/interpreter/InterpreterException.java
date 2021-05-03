package at.tuwien.calc.interpreter;

public class InterpreterException extends Exception {
    public InterpreterException() {
        super();
    }

    public InterpreterException(String message) {
        super(message);
    }

    public InterpreterException(String message, Throwable cause) {
        super(message, cause);
    }
}
