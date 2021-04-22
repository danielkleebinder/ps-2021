package at.tuwien.calc.interpreter;

import at.tuwien.calc.command.annotation.DecimalConstructionMode;
import at.tuwien.calc.command.annotation.ExecutionMode;
import at.tuwien.calc.command.annotation.IntegerConstructionMode;
import at.tuwien.calc.command.annotation.ListConstructionMode;
import at.tuwien.calc.context.CalculatorContext;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.stream.ICommandStream;
import at.tuwien.calc.stream.IOutputStream;


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
    public IContext interpret(String commandInput, IContext context) {
        Lexer lexer = new Lexer();
        ICommandStream commandStream = lexer.applyLexer(commandInput);

        while (commandStream.hasNextCommand()) {
            final Character currentCommand = commandStream.remove();
            commandRegistry
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
                    .forEach(commandInterpreter -> commandInterpreter.apply(context, currentCommand));
        }

        return context;
    }
}
