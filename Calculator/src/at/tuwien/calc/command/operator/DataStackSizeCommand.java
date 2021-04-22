package at.tuwien.calc.command.operator;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;


/**
 * Stack size ’#’ pushes the current number of stack entries onto the
 * stack.
 */
@ExecutionMode
public class DataStackSizeCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("#");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var size = new DoubleDataEntry(context.getDataStackSize());
        context.pushToDataStack(size);
    }
}
