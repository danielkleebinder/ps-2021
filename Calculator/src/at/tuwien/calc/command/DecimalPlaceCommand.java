package at.tuwien.calc.command;

import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.FloatDataEntry;

import java.util.regex.Pattern;


/**
 *
 */
public class DecimalPlaceCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\d");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getOperationMode() >= -1) {
            // Nothing to do here since this digit will not be used as
            // decimal place but as integer.
            return;
        }

        int opMode = context.getOperationMode();
        int digit = Integer.parseInt(String.valueOf(command));
        FloatDataEntry dataEntry = context.popFromDataStack();
        double newValue = dataEntry.get() + digit * Math.pow(10, opMode + 1);
        context.pushToDataStack(new FloatDataEntry((float) newValue));
        context.setOperationMode(opMode - 1);
    }
}
