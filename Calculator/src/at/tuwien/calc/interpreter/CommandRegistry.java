package at.tuwien.calc.interpreter;

import at.tuwien.calc.command.ExitCommand;
import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.list.*;
import at.tuwien.calc.command.number.DecimalPlaceCommand;
import at.tuwien.calc.command.number.DigitCommand;
import at.tuwien.calc.command.number.DotCommand;
import at.tuwien.calc.command.number.ResetNotNumberCommand;

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
            add(new DecimalPlaceCommand());
            add(new ResetNotNumberCommand());
            add(new BeginListCommand());
            add(new EndListCommand());
            add(new ListContentCommand());
            add(new ApplyImmediatelyCommand());
            add(new ApplyLaterCommand());
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
