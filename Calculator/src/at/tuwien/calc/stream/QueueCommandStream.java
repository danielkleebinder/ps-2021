package at.tuwien.calc.stream;

import java.util.ArrayDeque;


/**
 * A command stream which wraps a java.util.queue as data structure.
 */
public class QueueCommandStream implements ICommandStream {

    private ArrayDeque<Character> commandQueue = new ArrayDeque<>(128);

    @Override
    public void add(String commands) {
        commands.chars().forEach(c -> commandQueue.addLast((char) c));
    }

    @Override
    public void unshift(String commands) {
        new StringBuilder(commands)
                .reverse()
                .chars()
                .forEach(c -> commandQueue.addFirst((char) c));
    }

    @Override
    public boolean hasNextCommand() {
        return !commandQueue.isEmpty();
    }

    @Override
    public Character remove() {
        return commandQueue.poll();
    }

    @Override
    public String toString() {
        return "CommandQueue=" + commandQueue;
    }
}
