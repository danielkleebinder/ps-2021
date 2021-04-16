package at.tuwien.calc.interpreter;

import at.tuwien.calc.context.CalculatorContext;
import at.tuwien.calc.context.IContext;
import at.tuwien.calc.stream.ICommandStream;
import at.tuwien.calc.stream.IOutputStream;


/**
 * Wraps all calculator functionality. Uses a sequence of input command, interprets them
 * accordingly and outputs some context.
 */
public class Interpreter {

    private CommandRegistry commandRegistry = new CommandRegistry();
    private IOutputStream outputStream;

    public Interpreter(IOutputStream outputStream) {
        this.outputStream = outputStream;
    }

    /**
     * Interprets the given command input. Generates a new execution environment (i.e. context) for
     * every invocation of this method.
     *
     * @param commandInput List of commands.
     * @return Parsed context.
     */
    public IContext interpret(String commandInput) {
        Lexer lexer = new Lexer();
        ICommandStream commandStream = lexer.applyLexer(commandInput);
        IContext context = new CalculatorContext(outputStream);

        while (commandStream.hasNextCommand()) {
            final Character currentCommand = commandStream.remove();
            var commands = commandRegistry.getCommandsFor(currentCommand);
            if (commands.size() > 0) {
                commands.forEach(commandInterpreter -> commandInterpreter.apply(context, currentCommand));
            } else {
                commandRegistry.getInvalidCharacterCommand().apply(context, currentCommand);
            }
        }

        return context;
    }
}
