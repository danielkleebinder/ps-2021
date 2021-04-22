package at.tuwien.calc.command.operator;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;


/**
 * Write output ’"’ pops a value from the data stack and writes it
 * to the output stream. If the value is a list, the characters
 * in the list are directly written to the output stream (without
 * additional parentheses). If the value is a number, it is written
 * to the output stream in an appropriate format (beginning with
 * - for negative numbers and avoiding unnecessary digits).
 */
@ExecutionMode
public class WriteOutputCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\"");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var entry = context.popFromDataStack();
        context.writeLine(entry.toString());
    }
}
