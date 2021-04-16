package at.tuwien.calc.model;

import java.util.Objects;


/**
 * Represents a data entry holding a single character.
 */
public class CharacterDataEntry implements IDataEntry<Character> {

    private char data;

    public CharacterDataEntry(char data) {
        this.data = data;
    }

    @Override
    public Character get() {
        return null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CharacterDataEntry that = (CharacterDataEntry) o;
        return data == that.data;
    }

    @Override
    public int hashCode() {
        return Objects.hash(data);
    }

    @Override
    public String toString() {
        return Character.toString(data);
    }
}
