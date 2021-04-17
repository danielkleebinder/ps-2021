package at.tuwien.calc.command.number;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.DecimalConstructionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;


/**
 * This command can only be run if the operation mode is less than -1. It multiplies
 * the given digit by 10^(opMode+1) and add the result to the top value of the data stack.
 */
@DecimalConstructionMode
public class DecimalPlaceCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\d");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        int opMode = context.getOperationMode();
        int digit = Integer.parseInt(String.valueOf(command));
        DoubleDataEntry dataEntry = context.popFromDataStack();
        double newValue = dataEntry.get() + digit * Math.pow(10, opMode + 1);
        context.pushToDataStack(new DoubleDataEntry(newValue));
        context.setOperationMode(opMode - 1);
    }
}
