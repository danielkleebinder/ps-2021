package at.tuwien.calc.parser;

import at.tuwien.calc.command.DigitCommand;
import at.tuwien.calc.command.DotCommand;
import at.tuwien.calc.command.ExitCommand;
import at.tuwien.calc.command.ICommand;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CommandRegistry {

    private static List<ICommand> commandInterpreters = new ArrayList<>(64) {
        {
            add(new DigitCommand());
            add(new DotCommand());
            add(new ExitCommand());
        }
    };

    static List<ICommand> getCommandsFor(Character c) {
        String commandAsString = String.valueOf(c);
        return commandInterpreters.stream()
                .filter(command -> command.getCommandPattern().matcher(commandAsString).matches())
                .collect(Collectors.toList());
    }
}
