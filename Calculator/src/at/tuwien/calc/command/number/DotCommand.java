package at.tuwien.calc.command.number;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;


/**
 * The dot command will force decimal operations. Pushes a number of value 0 onto
 * the data stack, and the operation mode becomes −2.
 */
public class DotCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\.");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getOperationMode() > -1) {
            // Not in number construction mode, we cannot do anything here.
            return;
        }

        if (context.getOperationMode() < -1) {
            // We are in decimal construction mode and find another '.'. This is,
            // initiates the construction of a new number.
            context.pushToDataStack(new DoubleDataEntry(0.0));
        }

        // Always switch to decimal construction mode
        context.setOperationMode(-2);
    }
}