package at.tuwien.calc.command.list;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.command.annotation.ListConstructionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;


/**
 * Essential command for list construction which adds ’(’ to the list
 * on top of the data stack, and set the operation mode to m + 1.
 */
@ExecutionMode
@ListConstructionMode
public class BeginListCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\(");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getOperationMode() == 0) {
            // Operation mode is 0. This means execution mode. Therefore we add a new list
            // to the data stack.
            context.pushToDataStack(new ListDataEntry());
        }

        if (context.getOperationMode() > 0) {
            var dataEntry = context.peekDataStack();
            if (!(dataEntry instanceof ListDataEntry)) {
                // The top entry on the data stack has to be a list entry, otherwise we cannot
                // add new list content.
                return;
            }
            ((ListDataEntry) dataEntry).add(command);
        }

        // Increase operation mode by 1:
        //   - if the operation mode was 0 (i.e. execution mode), we will enter
        //     list construction mode
        //   - if the operation mode was >0 (i.e. list construction mode), we
        //     will increase the number of parentheses
        int opMode = context.getOperationMode();
        context.setOperationMode(opMode + 1);
    }
}
