package at.tuwien.calc.command.list;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ListConstructionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;


/**
 * Ends a list by adding ’)’ to the list on top of the data stack if m > 1, and
 * causes the operation mode to become m−1 in every case (this is, nothing is added
 * if the operation mode becomes 0).
 */
@ListConstructionMode
public class EndListCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\)");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var dataEntry = context.peekDataStack();
        if (!(dataEntry instanceof ListDataEntry)) {
            // The top entry on the data stack has to be a list entry, otherwise we cannot
            // add new list content.
            return;
        }

        if (context.getOperationMode() > 1) {
            // Are there open parentheses that were not closed yet? If so, add the
            // closing one.
            ((ListDataEntry) dataEntry).add(command);
        }

        int opMode = context.getOperationMode();
        context.setOperationMode(opMode - 1);
    }
}
