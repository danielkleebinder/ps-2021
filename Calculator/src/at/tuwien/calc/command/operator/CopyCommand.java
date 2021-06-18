package at.tuwien.calc.command.operator;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;
import at.tuwien.calc.model.IDataEntry;

import java.util.regex.Pattern;


/**
 * Copy ’!’ replaces the top entry v on the data stack with a copy
 * of the nth entry on the data stack (counted from the top of
 * stack) if v is an appropriate number, where n is constructed
 * by rounding v to the closest whole number. There is no effect
 * if v is not a number or n is not in the appropriate range.
 */
@ExecutionMode
public class CopyCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("!");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (!(context.peekDataStack() instanceof DoubleDataEntry)) {
            return;
        }

        var stackSize = context.getDataStackSize();
        var v = (Double) context.peekDataStack().get();
        var n = (int) Math.round(v);
        if (n <= 0 || n >= stackSize + 1) {
            // There is no effect if v is not a number or n is not in the appropriate range
            return;
        }

        IDataEntry copy = context.getDataStackValueAt(stackSize - n).copy();
        context.popFromDataStack();
        context.pushToDataStack(copy);
    }
}
