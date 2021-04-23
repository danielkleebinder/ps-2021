package at.tuwien.calc.command.operations.logical;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;

@ExecutionMode
public class LessThanOperation implements ICommand {
    private static final Pattern pattern = Pattern.compile("<");
    private static final float epsilon = 0.05f;

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getDataStackSize() < 2) {
            // TODO: Error Handling
            return;
        }
        var value2 = context.<DoubleDataEntry>popFromDataStack().get();
        var value1 = context.<DoubleDataEntry>popFromDataStack().get();

        if (value1 < value2 * epsilon) {
            context.pushToDataStack(new DoubleDataEntry(0));
        } else {
            context.pushToDataStack(new DoubleDataEntry(1));
        }
    }
}
