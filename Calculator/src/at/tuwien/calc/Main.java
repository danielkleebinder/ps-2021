package at.tuwien.calc;

import at.tuwien.calc.stream.ConsoleOutputStream;

import java.io.IOException;
import java.util.logging.Logger;

public class Main {
    public static void main(String[] args) {
        Logger logger = Logger.getLogger(Main.class.getName());

        Calculator calculator = new Calculator(System.in, new ConsoleOutputStream());

        try {
            calculator.boot();
        } catch (IOException e) {
            logger.severe(e.getMessage());
        }
    }
}
