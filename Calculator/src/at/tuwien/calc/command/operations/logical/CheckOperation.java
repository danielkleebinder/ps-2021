package at.tuwien.calc.command.operations.logical;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;


/**
 * Evaluates the top entry on the data stack and pushes
 * either TRUE (=1) or FALSE (=0) onto the data stack.
 */
@ExecutionMode
public class CheckOperation implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\?");
    private static final float epsilon = 0.05f;

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var dataEntry = context.popFromDataStack();
        if (dataEntry instanceof ListDataEntry) {
            context.pushToDataStack(new DoubleDataEntry(0));
        } else {
            var value = ((DoubleDataEntry) dataEntry).get();
            if (value <= epsilon && value >= -epsilon) {
                context.pushToDataStack(new DoubleDataEntry(0));
            } else {
                context.pushToDataStack(new DoubleDataEntry(1));
            }
        }
    }
}
