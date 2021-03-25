package at.tuwien.calc.stream;


/**
 * Writes strings to the console.
 */
public class ConsoleOutputStream implements IOutputStream {

    @Override
    public void write(String str) {
        System.out.print(str);
    }

    @Override
    public void writeLine(String str) {
        System.out.println(str);
    }
}
