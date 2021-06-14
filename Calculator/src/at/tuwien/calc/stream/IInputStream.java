package at.tuwien.calc.stream;

/**
 * Read data from some input medium.
 */
public interface IInputStream {

    /**
     * Reads a single character from the input stream.
     *
     * @return Single read character.
     */
    Character read();

    /**
     * Reads an entire line from the input stream. A line ends with a line break.
     *
     * @return Line.
     */
    String readLine();
}
