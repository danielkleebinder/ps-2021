package at.tuwien.calc.command.number;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.DecimalConstructionMode;
import at.tuwien.calc.command.annotation.IntegerConstructionMode;
import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;


/**
 * This command runs if no number command was matched.
 */
@IntegerConstructionMode
@DecimalConstructionMode
public class ResetNotNumberCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("^[^0-9\\.]+$");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        context.resetOperationMode();
    }
}
