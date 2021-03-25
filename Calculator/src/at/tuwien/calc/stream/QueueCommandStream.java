package at.tuwien.calc.stream;

import java.util.ArrayDeque;
import java.util.Queue;


/**
 * A command stream which wraps a java.util.queue as data structure.
 */
public class QueueCommandStream implements ICommandStream {

    private Queue<Character> commandQueue = new ArrayDeque<>(128);

    @Override
    public void add(String commands) {
        commands.chars().forEach(c -> commandQueue.add((char) c));
    }

    @Override
    public boolean hasNextCommand() {
        return !commandQueue.isEmpty();
    }

    @Override
    public Character remove() {
        return commandQueue.poll();
    }
}
