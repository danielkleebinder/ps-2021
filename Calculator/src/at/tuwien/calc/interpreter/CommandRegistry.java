package at.tuwien.calc.interpreter;

import at.tuwien.calc.command.DigitCommand;
import at.tuwien.calc.command.DotCommand;
import at.tuwien.calc.command.ExitCommand;
import at.tuwien.calc.command.ICommand;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Holds all available commands and returns them according to certain characters.
 */
public class CommandRegistry {

    /**
     * Add your new commands here. This is the only place required.
     */
    private List<ICommand> commandInterpreters = new ArrayList<>(64) {
        {
            add(new DigitCommand());
            add(new DotCommand());
            add(new ExitCommand());
        }
    };

    /**
     * Returns a list of commands which match the given character.
     *
     * @param c Character.
     * @return Commands that match.
     */
    public List<ICommand> getCommandsFor(Character c) {
        String commandAsString = String.valueOf(c);
        return commandInterpreters.stream()
                .filter(command -> command.getCommandPattern().matcher(commandAsString).matches())
                .collect(Collectors.toList());
    }
}
