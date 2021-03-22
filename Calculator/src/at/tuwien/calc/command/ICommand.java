package at.tuwien.calc.command;

import at.tuwien.calc.context.IContext;

import java.util.regex.Pattern;


/**
 * Everything in the application is interpreted as command. It does
 * not matter if number, character or operator. Everything will run
 * straight through a command.
 */
public interface ICommand {

    /**
     * Returns the pattern which has to be matched in the command queue
     * s.t. this command is applied. The pattern "\\d" would match all digits (0-9) for
     * example. This means that this command is only executed and applied iff this
     * pattern matches. The pattern is always only matched against single characters.
     *
     * @return Pattern to match against.
     */
    Pattern getCommandPattern();

    /**
     * Applies this command to the calculators context using the given (matched)
     * command. This method is NOT side-effect free. It completely relies on it's
     * context and the command and manipulates said ones.
     *
     * @param context The calculators context which will be manipulated by this command.
     * @param command The command (as plain character).
     */
    void apply(IContext context, Character command);
}
