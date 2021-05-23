package at.tuwien.calc.context;

import at.tuwien.calc.model.IDataEntry;
import at.tuwien.calc.stream.ICommandStream;
import at.tuwien.calc.stream.IOutputStream;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;


/**
 * The calculator context implementation. Uses specific collection implementations
 * to ensure optimal runtime performance for a calculator.
 */
public class CalculatorContext implements IContext {

    /**
     * I used a hash map here for performance reasons. The initial capacity
     * is 41 since prime numbers typically generate less hash collisions
     * in naive implementations.
     */
    private final Map<Character, IDataEntry<?>> register = new HashMap<>(41);
    private final Stack<IDataEntry<?>> dataStack = new Stack<>();

    private int operationMode = 0;

    // TODO: Is this command stream really necessary? Maybe same as from the lexer?
    private final ICommandStream commandStream;
    private final IOutputStream outputStream;

    public CalculatorContext(ICommandStream commandStream, IOutputStream outputStream) {
        this.commandStream = commandStream;
        this.outputStream = outputStream;
    }

    @Override
    public void setOperationMode(int operationMode) {
        this.operationMode = operationMode;
    }

    @Override
    public int getOperationMode() {
        return operationMode;
    }

    @Override
    public void resetOperationMode() {
        operationMode = 0;
    }

    @Override
    public <T extends IDataEntry<?>> T setRegisterValue(Character registerName, T value) {
        if (registerName < 'a' || registerName > 'z') {
            throw new IllegalArgumentException("Register name must be between a and z (inclusively)");
        }
        return (T) register.put(registerName, value);
    }

    @Override
    public <T extends IDataEntry<?>> T getRegisterValue(Character registerName) {
        if (registerName < 'a' || registerName > 'z') {
            throw new IllegalArgumentException("Register name must be between a and z (inclusively)");
        }
        return (T) register.get(registerName);
    }

    @Override
    public <T extends IDataEntry<?>> void pushToDataStack(T data) {
        dataStack.push(data);
    }

    @Override
    public <T extends IDataEntry<?>> T peekDataStack() {
        if (dataStack.isEmpty()) {
            return null;
        }
        return (T) dataStack.peek();
    }

    @Override
    public <T extends IDataEntry<?>> T popFromDataStack() {
        return (T) dataStack.pop();
    }

    @Override
    public void removeDataStackValueAt(int index) {
        dataStack.remove(index);
    }

    @Override
    public <T extends IDataEntry<?>> T getDataStackValueAt(int index) {
        return (T) dataStack.get(index);
    }

    @Override
    public int getDataStackSize() {
        return dataStack.size();
    }

    @Override
    public ICommandStream getCommandStream() {
        return commandStream;
    }

    @Override
    public void write(String output) {
        outputStream.write(output);
    }

    @Override
    public String toString() {
        return "CalculatorContext{" +
                "operationMode=" + operationMode +
                ", register=" + register +
                ", dataStack=" + dataStack +
                '}';
    }
}
