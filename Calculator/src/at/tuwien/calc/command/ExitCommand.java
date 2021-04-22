package at.tuwien.calc.command;

import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;


/**
 * The application will stop when the exit command arrives. We should probably
 * add some heart warming goodbye message here.
 */
public class ExitCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile(";");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        context.writeLine("Bye ❤❤❤");
        System.exit(0);
    }
}
