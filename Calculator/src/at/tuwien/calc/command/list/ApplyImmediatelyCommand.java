package at.tuwien.calc.command.list;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;


/**
 * Pops a list from the data stack (if the top entry is a list) and inserts the
 * list contents at the begin of the command stream to be executed next. There is
 * no effect if the top entry is a number.
 */
public class ApplyImmediatelyCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("@");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getOperationMode() != 0) {
            // Only available in execution mode
            return;
        }

        if (!(context.peekDataStack() instanceof ListDataEntry)) {
            // The top entry on the data stack has to be a list entry to read
            // commands from and add them to the command stream.
            return;
        }

        var listDataEntry = (ListDataEntry) context.popFromDataStack();
        context.getCommandStream().unshift(listDataEntry.get());
    }
}
