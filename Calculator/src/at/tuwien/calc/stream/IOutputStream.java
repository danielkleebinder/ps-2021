package at.tuwien.calc.stream;


/**
 * The output stream writes data to some output medium.
 */
public interface IOutputStream {

    /**
     * Writes an entire string to the output.
     *
     * @param str String to be written.
     */
    void write(String str);

    /**
     * Writes an entire string to the output and adds a system specific line separator
     * at the end.
     *
     * @param str String to be written.
     */
    void writeLine(String str);
}
