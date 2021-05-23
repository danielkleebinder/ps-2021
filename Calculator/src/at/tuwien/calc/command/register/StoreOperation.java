package at.tuwien.calc.command.register;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;

@ExecutionMode
public class StoreOperation implements ICommand {

    private static final Pattern pattern = Pattern.compile("[a-z]");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        var value = context.popFromDataStack();
        var register = command.toString().toLowerCase().toCharArray()[0];
        context.setRegisterValue(register, value);
    }
}
