package at.tuwien.calc.command.operator;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;


/**
 * Square root ’_’ (underline) replaces the top entry v on the data
 * stack with the square root of v if v is a positive number. There
 * is no effect if v is not a positive number.
 */
@ExecutionMode
public class SquareRootCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("_");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (!(context.peekDataStack() instanceof DoubleDataEntry)) {
            return;
        }
        var entry = (Double) context.popFromDataStack().get();
        if (entry < 0) {
            // There is no effect if v is not a positive number.
            return;
        }
        context.pushToDataStack(new DoubleDataEntry(entry * entry));
    }
}
