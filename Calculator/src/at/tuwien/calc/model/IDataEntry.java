package at.tuwien.calc.model;


/**
 * A data entry is the most basic building block for the data stack,
 * the registers and other app components centered around data. Data
 * entries are immutable by their nature.
 *
 * @param <T> Generic data type. Can be anything.
 */
public interface IDataEntry<T> {

    /**
     * Returns the value of this data entry.
     *
     * @return Value.
     */
    T get();
}
