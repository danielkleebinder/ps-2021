package at.tuwien.calc.model;


/**
 * A data entry is the most basic building block for the data stack,
 * the registers and other app components centered around data. Data
 * entries are immutable by their nature.
 *
 * @param <T> Generic data type. Can be anything.
 */
public interface IDataEntry<T> extends Cloneable {

    /**
     * Returns the value of this data entry.
     *
     * @return Value.
     */
    T get();

    /**
     * Creates an exact copy of this data entry.
     */
    IDataEntry<T> copy();
}
