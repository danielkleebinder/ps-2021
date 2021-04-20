package at.tuwien.calc;

import at.tuwien.calc.context.CalculatorContext;
import at.tuwien.calc.interpreter.Interpreter;
import at.tuwien.calc.stream.IOutputStream;
import at.tuwien.calc.stream.QueueCommandStream;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Calculator {

    BufferedReader inputStream;
    IOutputStream outputStream;

    Interpreter interpreter;
    CalculatorContext context;

    public Calculator(InputStream inputStream, IOutputStream outputStream) {
        this.interpreter = new Interpreter();
        this.outputStream = outputStream;
        this.inputStream = new BufferedReader(new InputStreamReader(inputStream));
        context = new CalculatorContext(new QueueCommandStream(), outputStream);
    }

    public void boot() throws IOException {
        outputStream.writeLine("Write # and press ENTER to exit the calculator:");
        outputStream.write("> ");
        String line;
        while ((line = inputStream.readLine()) != null) {
            var result = interpreter.interpret(line, context);
            outputStream.writeLine(result.toString());
            outputStream.write("> ");
        }
    }
}
