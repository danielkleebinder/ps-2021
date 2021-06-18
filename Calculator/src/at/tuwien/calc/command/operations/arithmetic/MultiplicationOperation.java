package at.tuwien.calc.command.operations.arithmetic;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;


/**
 * Performs an arithmetic multiplication.
 */
@ExecutionMode
public class MultiplicationOperation implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\*");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var factor2 = context.<DoubleDataEntry>popFromDataStack().get();
        var factor1 = context.<DoubleDataEntry>popFromDataStack().get();
        var result = factor1 * factor2;
        context.pushToDataStack(new DoubleDataEntry(result));
    }
}
