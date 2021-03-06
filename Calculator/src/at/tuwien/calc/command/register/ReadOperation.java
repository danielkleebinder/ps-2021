package at.tuwien.calc.command.register;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;

/**
 * Lowercase letter āaā to āzā pushes the contents of the corresponding
 * data register a to z onto the data stack.
 */
@ExecutionMode
public class ReadOperation implements ICommand {
    private static final Pattern pattern = Pattern.compile("[A-Z]");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var registerContent = context.getRegisterValue(Character.toLowerCase(command));
        if (registerContent == null) {
            // We do not want to push null values onto the data stack
            return;
        }
        context.pushToDataStack(registerContent);
    }
}
