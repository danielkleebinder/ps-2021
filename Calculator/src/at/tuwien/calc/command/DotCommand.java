package at.tuwien.calc.command;

import at.tuwien.calc.context.IContext;
import at.tuwien.calc.model.FloatDataEntry;

import java.util.regex.Pattern;


/**
 * The dot command will force decimal operations. Pushes a number of value 0 onto
 * the data stack, and the operation mode becomes −2.
 */
public class DotCommand implements ICommand {

    private static final Pattern pattern = Pattern.compile("\\.");

    @Override
    public Pattern getCommandPattern() {
        return pattern;
    }

    @Override
    public void apply(IContext context, Character command) {
        context.setOperationMode(-2);
        context.pushToDataStack(new FloatDataEntry(0.0f));
    }
}
