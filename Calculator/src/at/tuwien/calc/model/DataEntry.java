package at.tuwien.calc.model;


import java.util.Objects;

/**
 * A data entry is the most basic building block for the data stack,
 * the registers and other app components centered around data.
 *
 * @param <T> Generic data type. Can be anything.
 */
public class DataEntry<T> {

    /**
     * Data payload. Cannot be null by definition. Otherwise a data entry
     * would not exist in the first place.
     */
    protected T payload;


    /**
     * Creates a new data entry with the given payload. The payload is
     * not allowed to be null.
     *
     * @param payload Payload.
     */
    public DataEntry(T payload) {
        this.set(payload);
    }

    /**
     * Sets the data payload. Null values are not allowed. If null provided,
     * the method will throw an exception.
     *
     * @param payload New payload.
     */
    public void set(T payload) {
        if (payload == null) {
            throw new IllegalArgumentException("Payload cannot be null");
        }
        this.payload = payload;
    }

    /**
     * Returns the payload of this data entry. Will NEVER be null.
     *
     * @return Data payload.
     */
    public T get() {
        return payload;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DataEntry<?> dataEntry = (DataEntry<?>) o;
        return Objects.equals(payload, dataEntry.payload);
    }

    @Override
    public int hashCode() {
        return Objects.hash(payload);
    }

    @Override
    public String toString() {
        return "" + payload;
    }
}
