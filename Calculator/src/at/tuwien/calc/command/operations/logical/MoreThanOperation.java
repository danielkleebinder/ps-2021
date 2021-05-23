package at.tuwien.calc.command.operations.logical;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;

@ExecutionMode
public class MoreThanOperation implements ICommand {
    private static final Pattern pattern = Pattern.compile(">");
    private static final float epsilon = 0.05f;

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getDataStackSize() < 2) {
            return;
        }
        var value2 = context.popFromDataStack();
        var value1 = context.popFromDataStack();

        // Compare different types
        if (value1.getClass() != value2.getClass()) {
            if (value1 instanceof ListDataEntry) {
                context.pushToDataStack(new DoubleDataEntry(1));
            } else {
                context.pushToDataStack(new DoubleDataEntry(0));
            }
            return;
        }

        // Compare same types
        if (value1.compareTo(value2) > 0) {
            context.pushToDataStack(new DoubleDataEntry(1));
        } else {
            context.pushToDataStack(new DoubleDataEntry(0));
        }
    }
}
