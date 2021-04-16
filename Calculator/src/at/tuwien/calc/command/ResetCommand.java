package at.tuwien.calc.command;

import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;


/**
 * This command is executed if no other command was matched. It resets
 * the operation mode.
 */
public class ResetCommand implements ICommand {

    @Override
    public Pattern getCommandPattern() {
        throw new IllegalStateException("The reset pattern can only be used as a fallback");
    }

    @Override
    public void apply(IContext context, Character command) {
        context.resetOperationMode();
    }
}
