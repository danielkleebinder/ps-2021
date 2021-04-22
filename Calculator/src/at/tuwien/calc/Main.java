package at.tuwien.calc;

import at.tuwien.calc.interpreter.Interpreter;
import at.tuwien.calc.stream.ConsoleOutputStream;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        Interpreter interpreter = new Interpreter(new ConsoleOutputStream());
        BufferedReader inputStream = new BufferedReader(new InputStreamReader(System.in));

        System.out.println("Write ; and press ENTER to exit the calculator:");
        System.out.print("> ");
        String line;
        while ((line = inputStream.readLine()) != null) {
            var result = interpreter.interpret(line);
            System.out.println(result);
            System.out.print("> ");
        }
    }
}
