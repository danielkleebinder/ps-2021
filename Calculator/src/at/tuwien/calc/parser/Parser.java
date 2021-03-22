package at.tuwien.calc.parser;

import at.tuwien.calc.context.CalculatorContext;
import at.tuwien.calc.context.IContext;

import java.io.OutputStream;
import java.util.ArrayDeque;
import java.util.Queue;


/**
 * Wraps all calculator functionality. Uses a sequence of input command, parses them
 * accordingly and outputs some context.
 */
public class Parser {

    private Queue<Character> commandQueue = new ArrayDeque<>(128);
    private OutputStream outputStream;

    public Parser(OutputStream outputStream) {
        this.outputStream = outputStream;
    }

    /**
     * Parses the given command input. Generates a new execution environment (i.e. context) for
     * every invocation of this method.
     *
     * @param commandInput List of commands.
     * @return Parsed context.
     */
    public IContext parse(String commandInput) {
        IContext context = new CalculatorContext(outputStream);

        commandInput.chars().forEach(c -> commandQueue.add((char) c));

        Character currentCommand;
        while ((currentCommand = commandQueue.poll()) != null) {
            final Character cmd = currentCommand;
            CommandRegistry
                    .getCommandsFor(currentCommand)
                    .forEach(commandInterpreter -> commandInterpreter.apply(context, cmd));
        }

        return context;
    }
}
