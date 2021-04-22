package at.tuwien.calc.model;

import java.util.Objects;


/**
 * Represents a data entry holding a floating point number.
 */
public class DoubleDataEntry implements IDataEntry<Double> {

    private double data;

    public DoubleDataEntry(double data) {
        this.data = data;
    }

    @Override
    public Double get() {
        return data;
    }

    @Override
    public IDataEntry<Double> copy() {
        return new DoubleDataEntry(data);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DoubleDataEntry dataEntry = (DoubleDataEntry) o;
        return Double.compare(dataEntry.data, data) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(data);
    }

    @Override
    public String toString() {
        return Double.toString(data);
    }
}
