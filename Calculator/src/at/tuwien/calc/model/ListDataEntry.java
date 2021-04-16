package at.tuwien.calc.model;

import java.util.Objects;
import java.util.stream.Collectors;


/**
 * Represents a data entry holding a list of characters.
 */
public class ListDataEntry implements IDataEntry<String> {

    private final StringBuilder data = new StringBuilder(32);

    /**
     * Adds the given character to the end of the list.
     *
     * @param c Character to add.
     */
    public void add(Character c) {
        data.append(c);
    }

    @Override
    public String get() {
        return data.toString();
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
        return "List=" + data.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
    }
}
