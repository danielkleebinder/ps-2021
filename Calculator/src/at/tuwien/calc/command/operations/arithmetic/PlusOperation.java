package at.tuwien.calc.command.operations.arithmetic;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;

@ExecutionMode
public class PlusOperation implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\+");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        DoubleDataEntry term1 = context.popFromDataStack();
        DoubleDataEntry term2 = context.popFromDataStack();
        var result = term1.get() + term2.get();
        context.pushToDataStack(new DoubleDataEntry(result));
    }
}
