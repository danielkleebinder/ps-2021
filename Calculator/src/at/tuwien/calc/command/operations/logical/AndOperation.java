package at.tuwien.calc.command.operations.logical;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.DoubleDataEntry;
import at.tuwien.calc.model.IDataEntry;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;

@ExecutionMode
public class AndOperation implements ICommand {
    private static final Pattern pattern = Pattern.compile("&");
    private static final float epsilon = 0.0005f;
    private static final int TRUE = 1;
    private static final int FALSE = 0;

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getDataStackSize() < 2) {
            // Not enough items on the stack
            return;
        }

        IDataEntry term1 = context.popFromDataStack();
        IDataEntry term2 = context.popFromDataStack();

        if (!(term1 instanceof DoubleDataEntry)) {
            // The empty list () is pushed to the data stack if an argument is not
            // a number or the result would be the special value NaN (not a number)
            context.pushToDataStack(new ListDataEntry());
            return;
        }

        var d1 = (double) term1.get();
        var d2 = (double) term2.get();
        if (Math.abs(d1) > (FALSE + epsilon) && Math.abs(d2) > (FALSE + epsilon)) {
            // Both values are not false, push true to the data stack
            context.pushToDataStack(new DoubleDataEntry(TRUE));
            return;
        }

        // At least one of both terms is false, push false to the data stack
        context.pushToDataStack(new DoubleDataEntry(FALSE));
    }
}
