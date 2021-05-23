package at.tuwien.calc.model;

import java.util.Objects;


/**
 * Represents a data entry holding a floating point number.
 */
public class DoubleDataEntry implements IDataEntry<Double> {

    private final double EPSILON = 0.0005;
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
    public int compareTo(IDataEntry o) {
        if (!(o instanceof DoubleDataEntry)) {
            return 0;
        }
        var comp = get() - ((DoubleDataEntry) o).get();
        if (comp <= EPSILON && comp >= -EPSILON) {
            return 0;
        }
        return comp > 0 ? 1 : -1;
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
