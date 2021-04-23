package at.tuwien.calc.command.operations.logical;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;

@ExecutionMode
public class NegationOperation implements ICommand {

    private static final Pattern pattern = Pattern.compile("~");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var dataEntry = context.popFromDataStack();
        if (dataEntry instanceof ListDataEntry) {
            context.pushToDataStack(new ListDataEntry("()"));
        } else {
            var value = ((DoubleDataEntry) dataEntry).get();
            context.pushToDataStack(new DoubleDataEntry(-value));
        }
    }
}
