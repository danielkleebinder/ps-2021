package at.tuwien.calc.context;

import at.tuwien.calc.model.IDataEntry;
import at.tuwien.calc.stream.ICommandStream;


/**
 * A context is a certain environment which holds state of the calculate. This
 * interface has to be implemented differently for different scenarios to optimize
 * non-functional requirements like performance.
 */
public interface IContext {

    /**
     * Sets the operation mode. There are certain operation modes defined:
     * <ul>
     *     <li>0: Default operation mode, push something into the data stack</li>
     *     <li>-1: Number construction mode</li>
     *     <li>-2: Decimal construction mode</li>
     *     <li>1: List construction mode</li>
     * </ul>
     *
     * @param operationMode Operation mode.
     */
    void setOperationMode(int operationMode);

    default void switchToExecutionMode() {
        setOperationMode(0);
    }

    default void switchToNumberConstructionMode() {
        setOperationMode(-1);
    }

    default void switchToListConstructionMode() {
        setOperationMode(1);
    }

    /**
     * Returns the currently used operation mode.
     *
     * @return Active operation mode.
     * @see IContext#setOperationMode(int)
     */
    int getOperationMode();

    default boolean isExecutionMode() {
        return getOperationMode() == 0;
    }

    /**
     * Resets to the default operation mode (typically 0).
     */
    void resetOperationMode();

    /**
     * Sets a register value. There are 26 registers available in total. They are named from
     * lower case a to lower case z. If the given register name does not match any of those
     * 26 possible register names, then an exception will be thrown.
     *
     * @param registerName Register name between a-z (inclusively).
     * @param value        Value to be put at the register.
     * @param <T>          Data entry type.
     * @return Null if the register was previously empty, otherwise the old register value is returned.
     */
    <T extends IDataEntry<?>> T setRegisterValue(Character registerName, T value);

    /**
     * Returns the register value at the given register name position. This has to be a
     * character between a and z. If not, an exception will be thrown.
     *
     * @param registerName Register name between a-z (inclusively).
     * @param <T>          Data entry type.
     * @return Null if no value is available, otherwise the reguster value.
     * @see IContext#setRegisterValue(Character, IDataEntry)
     */
    <T extends IDataEntry<?>> T getRegisterValue(Character registerName);

    /**
     * Pushes the given data entry onto the data stack. How this is handled is completely
     * up to it's implementation.
     *
     * @param data Data entry.
     * @param <T>  Data entry type.
     */
    <T extends IDataEntry<?>> void pushToDataStack(T data);

    /**
     * Takes a look at the top most entry of the data stack but does not remove it.
     *
     * @param <T> Data entry type.
     * @return Data entry.
     */
    <T extends IDataEntry<?>> T peekDataStack();

    /**
     * Pops the latest data entry from the data stack.
     *
     * @param <T> Data entry type.
     * @return Data entry.
     */
    <T extends IDataEntry<?>> T popFromDataStack();


    /**
     * Removes the value at the n'th position on the data stack. The index n
     * is counted FROM THE TOP of the stack, not as usual, from the bottom.
     *
     * @param index Data stack index counting from the top.
     */
    void removeDataStackValueAt(int index);

    /**
     * Returns the value of the data stack at the given index.
     *
     * @param index Data stack index.
     * @param <T>   Data entry type.
     * @return Data entry.
     */
    <T extends IDataEntry<?>> T getDataStackValueAt(int index);

    /**
     * Returns the current size of the data stack.
     *
     * @return Data stack size.
     */
    int getDataStackSize();


    /**
     * Returns the currently active command stream for this context. Use this to push and
     * pop new command if available.
     *
     * @return Command stream.
     */
    ICommandStream getCommandStream();

    /**
     * Writes the given string to the output stream.
     *
     * @param output String to be written.
     */
    void write(String output);

    /**
     * Writes the given line to the output stream and adds a line separator at the end. The
     * kind of line separator used depends on the operating system.
     *
     * @param line String to be written.
     */
    default void writeLine(String line) {
        write(line + System.lineSeparator());
    }
}
