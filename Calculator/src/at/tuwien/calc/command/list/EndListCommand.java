package at.tuwien.calc.command.list;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;

public class EndListCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\)");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        if (context.getOperationMode() <= 1) {
            // List construction mode has to be enabled (i.e. opMode > 0) and
            // there must be opening parentheses (i.e. '(' ).
            return;
        }

        var dataEntry = context.peekDataStack();
        if (!(dataEntry instanceof ListDataEntry)) {
            // The top entry on the data stack has to be a list entry, otherwise we cannot
            // add new list content.
            return;
        }

        ((ListDataEntry) dataEntry).add(command);
        int opMode = context.getOperationMode();
        context.setOperationMode(opMode - 1);
    }
}
