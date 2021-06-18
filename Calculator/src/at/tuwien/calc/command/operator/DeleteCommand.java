package at.tuwien.calc.command.operator;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;

import java.util.regex.Pattern;


/**
 * Delete ’$’ pops the top entry v from the data stack and (if n
 * is an appropriate number) removes the nth entry from the
 * data stack (counted from the top of the stack), where n is
 * constructed by rounding v to the closest whole number. Pops
 * only v from the data stack if v is not a number or n is not in
 * the appropriate range.
 */
@ExecutionMode
public class DeleteCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\$");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var entry = context.popFromDataStack();
        if (!(entry instanceof DoubleDataEntry)) {
            // ... but if n is an appropriate number, continue
            return;
        }

        var stackSize = context.getDataStackSize();
        var v = (Double) entry.get();
        var n = (int) Math.round(v);
        if (n < 0 || n >= stackSize + 1) {
            // Pops only v from the data stack if v is not a number or n is
            // not in the appropriate range.
            return;
        }

        context.removeDataStackValueAt(stackSize - n);
    }
}
