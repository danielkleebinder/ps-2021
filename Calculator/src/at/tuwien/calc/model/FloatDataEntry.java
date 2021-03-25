package at.tuwien.calc.model;

import java.util.Objects;


/**
 * Represents a data entry holding a floating points number.
 */
public class FloatDataEntry implements IDataEntry<Float> {

    private float data;

    public FloatDataEntry(float data) {
        this.data = data;
    }

    @Override
    public Float get() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FloatDataEntry dataEntry = (FloatDataEntry) o;
        return Float.compare(dataEntry.data, data) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(data);
    }

    @Override
    public String toString() {
        return "" + data;
    }
}
