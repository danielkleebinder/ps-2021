package at.tuwien.calc.command;

import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.FloatDataEntry;

import java.util.regex.Pattern;


/**
 * Handles all digit circumstances in the command stream. Every character
 * that matches against the digit pattern will invoke this command. Pushes
 * the value of the input character (0 to 9) as a whole floating-point number
 * onto the data stack, and the operation mode becomes −1.
 */
public class DigitCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\d");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        int digit = Integer.parseInt(String.valueOf(command));

        if (context.getOperationMode() == -1) {
            FloatDataEntry dataEntry = context.popFromDataStack();
            float newValue = dataEntry.get() * 10 + digit;
            context.pushToDataStack(new FloatDataEntry(newValue));
        }

        if (context.getOperationMode() == 0) {
            context.setOperationMode(-1);
            context.pushToDataStack(new FloatDataEntry((float) digit));
        }
    }
}
