package at.tuwien.calc.interpreter;

import at.tuwien.calc.stream.ICommandStream;
import at.tuwien.calc.stream.QueueCommandStream;


/**
 * A lexer converts a stream (or sequence) of characters into a sequence of
 * language specific tokens which do have unique meaning for the application
 * context.
 */
public class Lexer {

    /**
     * Takes the given sequence of character and returns a command stream.
     *
     * @param commandInput Character sequence.
     * @return Command stream.
     */
    public ICommandStream applyLexer(String commandInput) {
        ICommandStream result = new QueueCommandStream();
        result.add(commandInput);
        return result;
    }
}
