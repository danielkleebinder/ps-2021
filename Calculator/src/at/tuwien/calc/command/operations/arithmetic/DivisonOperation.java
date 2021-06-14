package at.tuwien.calc.command.operations.arithmetic;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;

/**
 * Performs an arithmetic division. An empty list is pushed to the stack
 * if the divisor is zero to prevent arithmetic exceptions.
 */
@ExecutionMode
public class DivisonOperation implements ICommand {

    private static final Pattern pattern = Pattern.compile("/");
    private static final float epsilon = 0.05f;

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var divisor = context.<DoubleDataEntry>popFromDataStack().get();
        var dividend = context.<DoubleDataEntry>popFromDataStack().get();
        if (divisor <= epsilon && divisor >= -epsilon) {
            context.pushToDataStack(new ListDataEntry("()"));
        } else {
            var result = dividend / divisor;
            context.pushToDataStack(new DoubleDataEntry(result));
        }
    }
}
