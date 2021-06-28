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
        outputStream.writeLine("Write ; and press ENTER to exit the calculator. The following programs are pre-installed:");
        outputStream.writeLine("  - W: Factorial (e.g. '6 W@' will output 720)");
        outputStream.writeLine("  - X: Triangle Area (e.g. '0 0 0 1 0 0 0 1 0 X@' will output 0.49999)");
        outputStream.writeLine("  - Y: Sum of Triangle Areas (e.g. '0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 0 2 Y@' will output 0.99999)");
        outputStream.writeLine("  - Z: Octahedron Surface Area (e.g. '2 Z@' will output [13.856406460551018, 13.856406460551021])");
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
        IDataEntry calculateFactorial = new ListDataEntry("(3!3!1-2!1=4!()(4!4$1+$@)@2$*)3!3$3!@2$");
        IDataEntry calculateOctahedronSurfaceArea = new ListDataEntry("(2!3!*2*3_*)@(3!2/,4!3_*2/,0)@(6!6$,0,0)@(0,0,0)@X@8*");
        IDataEntry calculateTriangleArea = new ListDataEntry("" +
                "(2!6!-2!*)@(4!8!-2!*)@(6!10!-2!*)@++_" +
                "(3!10!-2!*)@(5!12!-2!*)@(7!14!-2!*)@++_" +
                "(7!11!-2!*)@(9!13!-2!*)@(11!15!-2!*)@++_" +
                "4$4$4$4$4$4$4$4$4$" +
                "(4!4!4!++2/)@" +
                "(2!4!-)@(3!6!-)@(4!8!-)@***_" +
                "2$2$2$");
        IDataEntry calculateTriangleAreaSums = new ListDataEntry("" +
                "(5!4!4!1-3!3!" +
                "-4*14+" +
                "2!!3!!4!!5!!6!!7!!8!!9!!10!!" +
                "11!$11!$11!$11!$11!$11!$11!$11!$11!$" +
                "X@5!5!4$4$4$2!" +
                "1=6!(1$1$)(4!4$1+$@)" +
                "@2$2$2$+)" +
                "12!12!12!12!12!12!12!12!12!" +
                "12$12$12$12$12$12$12$12$12$" +
                "X@4!5!5$5!@2$");

        this.context.setRegisterValue('w', calculateFactorial);
        this.context.setRegisterValue('x', calculateTriangleArea);
        this.context.setRegisterValue('y', calculateTriangleAreaSums);
        this.context.setRegisterValue('z', calculateOctahedronSurfaceArea);
    }
}
