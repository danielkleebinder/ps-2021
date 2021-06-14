package at.tuwien.calc.stream;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Reads strings from the command line.
 */
public final class ConsoleInputStream implements IInputStream {

    private BufferedReader reader;

    public ConsoleInputStream() {
        reader = new BufferedReader(new InputStreamReader(System.in));
    }

    @Override
    public Character read() {
        try {
            return (char) reader.read();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public String readLine() {
        try {
            return reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
