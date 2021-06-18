package at.tuwien.calc.command.operations.arithmetic;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;


/**
 * Rounds the top entry on the data stack and pushes it back on the stack.
 */
@ExecutionMode
public class RoundingOperation implements ICommand {

    private static final Pattern pattern = Pattern.compile("%");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var dataEntry = context.peekDataStack();
        if (dataEntry instanceof ListDataEntry) {
            context.pushToDataStack(new ListDataEntry("()"));
        } else {
            var value = ((DoubleDataEntry) dataEntry).get();
            var nextWholeInteger = Math.round(value);
            context.pushToDataStack(new DoubleDataEntry(nextWholeInteger - value));
        }
    }
}
