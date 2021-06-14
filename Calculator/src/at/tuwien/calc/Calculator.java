package at.tuwien.calc;

import at.tuwien.calc.context.CalculatorContext;
import at.tuwien.calc.interpreter.Interpreter;
import at.tuwien.calc.interpreter.InterpreterException;
import at.tuwien.calc.model.IDataEntry;
import at.tuwien.calc.stream.IInputStream;
import at.tuwien.calc.stream.IOutputStream;
import at.tuwien.calc.stream.QueueCommandStream;

import java.io.IOException;

public class Calculator {

    IInputStream inputStream;
    IOutputStream outputStream;

    Interpreter interpreter;
    CalculatorContext context;

    public Calculator(IInputStream inputStream, IOutputStream outputStream) {
        this.inputStream = inputStream;
        this.outputStream = outputStream;

        this.interpreter = new Interpreter();
        this.context = new CalculatorContext(new QueueCommandStream(), outputStream);
        this.interpreter.setExtensiveLogging(false);
    }

    public void boot() throws IOException {
        outputStream.writeLine("Write ; and press ENTER to exit the calculator:");
        outputStream.write("> ");
        String line;
        while ((line = inputStream.readLine()) != null) {
            try {
                interpreter.interpret(line, context);
            } catch (InterpreterException e) {
                outputStream.writeLine("Failed to interpret command: " + e.getMessage());
            }
            outputStream.writeLine(context.toString());
            outputStream.write("> ");
        }
    }

    public void flashRegister(Character register, IDataEntry<?> value) {
        this.context.setRegisterValue(register, value);
    }
}
