package at.tuwien.calc;

import at.tuwien.calc.parser.Parser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        Parser parser = new Parser(System.out);
        BufferedReader inputStream = new BufferedReader(new InputStreamReader(System.in));

        System.out.println("Write # and press ENTER to exit the calculator:");
        System.out.print("> ");
        String line;
        while ((line = inputStream.readLine()) != null) {
            var result = parser.parse(line);
            System.out.println(result);
            System.out.print("> ");
        }
    }
}
