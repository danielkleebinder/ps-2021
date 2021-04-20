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
                    .filter(interpreter -> (interpreter.getClass().getAnnotations().length <= 0) ||
                            (interpreter.getClass().isAnnotationPresent(ExecutionMode.class) && context.getOperationMode() == 0) ||
                            (interpreter.getClass().isAnnotationPresent(IntegerConstructionMode.class) && context.getOperationMode() == -1) ||
                            (interpreter.getClass().isAnnotationPresent(DecimalConstructionMode.class) && context.getOperationMode() < -1) ||
                            (interpreter.getClass().isAnnotationPresent(ListConstructionMode.class) && context.getOperationMode() > 0))
                    .forEach(commandInterpreter -> commandInterpreter.apply(context, currentCommand));
        }

        return context;
    }
}
