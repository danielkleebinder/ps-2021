package at.tuwien.calc;

import at.tuwien.calc.stream.ConsoleInputStream;
import at.tuwien.calc.stream.ConsoleOutputStream;

public class Main {
    public static void main(String[] args) {
        Calculator calculator = new Calculator(
                new ConsoleInputStream(),
                new ConsoleOutputStream());
        calculator.boot();
    }
}
