package at.tuwien.calc.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/**
 * Represents a data entry holding a list of characters.
 */
public class ListDataEntry implements IDataEntry<List<Character>> {

    private final List<Character> data = new ArrayList<>(8);

    @Override
    public List<Character> get() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListDataEntry that = (ListDataEntry) o;
        return Objects.equals(data, that.data);
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
