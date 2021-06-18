package at.tuwien.calc.command.operator;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;


/**
 * Read input ’\’’ (single quote) waits until the input stream contains a line (terminated
 * by “enter”) and converts the line (except of “enter”) to an input value: If the characters
 * in the line can be interpreted as a number, the input value is the corresponding number. Otherwise
 * if the line is well-formed (this is, if there are parentheses, opening and closing parentheses
 * match), the input value is a list containing the sequence of characters in the line. Otherwise (not
 * well-formed) the input value is the empty list (). The input value is pushed onto the data stack.
 */
@ExecutionMode
public class ReadInputCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("'");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
    }
}
