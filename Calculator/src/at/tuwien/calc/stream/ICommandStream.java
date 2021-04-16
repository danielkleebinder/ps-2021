package at.tuwien.calc.stream;


/**
 * The command stream is a stream of characters which each individually refer to actions
 * interpreted by some interpreter. A command stream works like a FIFO-queue.
 */
public interface ICommandStream {

    /**
     * Adds a single character command to the stream. The command is always
     * put at the end of the stream.
     *
     * @param command Command.
     */
    default void add(Character command) {
        add(String.valueOf(command));
    }

    /**
     * Adds the given commands to the end of the stream.
     *
     * @param commands Commands.
     */
    void add(String commands);

    /**
     * Adds a single character command to the stream. The command is always
     * added to the beginning of the stream.
     *
     * @param command Command.
     */
    default void unshift(Character command) {
        unshift(String.valueOf(command));
    }

    /**
     * Adds the given commands to the beginning of the stream.
     *
     * @param commands Commands.
     */
    void unshift(String commands);

    /**
     * Checks if there is still another command in the stream. If so, it returns
     * true, otherwise false.
     *
     * @return True if another command is in the stream.
     */
    boolean hasNextCommand();

    /**
     * Removes the command at the head of the stream and returns it.
     *
     * @return Next command.
     */
    Character remove();
}
