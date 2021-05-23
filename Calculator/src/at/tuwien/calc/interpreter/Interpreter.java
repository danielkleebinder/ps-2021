package at.tuwien.calc.interpreter;

import at.tuwien.calc.command.ICommand;
import at.tuwien.calc.command.annotation.DecimalConstructionMode;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.command.annotation.IntegerConstructionMode;
import at.tuwien.calc.command.annotation.ListConstructionMode;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.stream.ICommandStream;

import java.util.List;
import java.util.stream.Collectors;


/**
 * Wraps all calculator functionality. Uses a sequence of input command, interprets them
 * accordingly and outputs some context.
 */
public class Interpreter {

    private final CommandRegistry commandRegistry = new CommandRegistry();

    /**
     * Interprets the given command input. Generates a new execution environment (i.e. context) for
     * every invocation of this method.
     *
     * @param commandInput List of commands.
     * @return Parsed context.
     */
    public IContext interpret(String commandInput, IContext context) throws InterpreterException {
        Lexer lexer = new Lexer();
        ICommandStream commandStream = lexer.applyLexer(commandInput);

        while (commandStream.hasNextCommand()) {
            final Character currentCommand = commandStream.remove();
            List<ICommand> commands = commandRegistry
                    .getCommandsFor(currentCommand)
                    .stream()
                    .filter(interpreter -> {
                        var execMode = interpreter.getClass().isAnnotationPresent(ExecutionMode.class);
                        var intMode = interpreter.getClass().isAnnotationPresent(IntegerConstructionMode.class);
                        var decMode = interpreter.getClass().isAnnotationPresent(DecimalConstructionMode.class);
                        var listMode = interpreter.getClass().isAnnotationPresent(ListConstructionMode.class);

                        if (!execMode && !intMode && !decMode && !listMode) {
                            return true;
                        }
                        return (execMode && context.getOperationMode() == 0) ||
                                (intMode && context.getOperationMode() == -1) ||
                                (decMode && context.getOperationMode() < -1) ||
                                (listMode && context.getOperationMode() > 0);
                    })
                    .collect(Collectors.toList());

            if (commands.size() > 1) {
                throw new InterpreterException("Too many matching commands found.");
            }

            // I don't think that we should throw an exception here. This causes problems with
            // whitespaces or other characters that do not match.
            if (!commands.isEmpty()) {
                // throw new InterpreterException("No matching commands found.");
                commands.get(0).apply(context, currentCommand);
            }
        }

        return context;
    }
}
