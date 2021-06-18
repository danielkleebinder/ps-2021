package at.tuwien.calc;

import at.tuwien.calc.context.CalculatorContext;
import at.tuwien.calc.interpreter.Interpreter;
import at.tuwien.calc.interpreter.InterpreterException;
import at.tuwien.calc.model.IDataEntry;
import at.tuwien.calc.model.ListDataEntry;
import at.tuwien.calc.stream.IInputStream;
import at.tuwien.calc.stream.IOutputStream;
import at.tuwien.calc.stream.QueueCommandStream;


/**
 * Calculator implementation according to the given specification.
 */
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

        this.setupPreDefinedPrograms();
    }

    /**
     * Starts the calculators input procedure.
     */
    public void boot() {
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

    /**
     * Installs the pre-defined programs.
     */
    private void setupPreDefinedPrograms() {
        IDataEntry calculateOctahedronSurfaceArea = new ListDataEntry("2!*2*3_*");
        IDataEntry calculateTriangleArea = new ListDataEntry("" +
                "(2!6!-2!*)@(4!8!-2!*)@(6!10!-2!*)@++_" +
                "(3!10!-2!*)@(5!12!-2!*)@(7!14!-2!*)@++_" +
                "(7!11!-2!*)@(9!13!-2!*)@(11!15!-2!*)@++_" +
                "4$4$4$4$4$4$4$4$4$" +
                "(4!4!4!++2/)@" +
                "(2!4!-)@(3!6!-)@(4!8!-)@***_" +
                "2$2$2$");

        this.context.setRegisterValue('x', calculateTriangleArea);
        this.context.setRegisterValue('z', calculateOctahedronSurfaceArea);
    }
}
