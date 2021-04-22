package at.tuwien.calc.command.operations.arithmetic;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;

@ExecutionMode
public class MinusOperation implements ICommand {
    private static final Pattern pattern = Pattern.compile("\\-");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        DoubleDataEntry subtrahend = context.popFromDataStack();
        DoubleDataEntry minuend = context.popFromDataStack();
        var result = minuend.get() - subtrahend.get();
        context.pushToDataStack(new DoubleDataEntry(result));
    }
}
