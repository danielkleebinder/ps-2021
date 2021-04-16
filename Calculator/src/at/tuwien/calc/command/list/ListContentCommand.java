package at.tuwien.calc.command.list;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ListConstructionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.ListDataEntry;

import java.util.regex.Pattern;


/**
 * Adds the command to the list on top of the data stack if the character is neither
 * '(' nor ')'.
 */
@ListConstructionMode
public class ListContentCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("[^\\(\\)]");

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

        ((ListDataEntry) dataEntry).add(command);
    }
}
