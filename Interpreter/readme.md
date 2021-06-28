# Exercise 2 - Group C

The exercise was to create a language with the corresponding interpreter.
We chose the example language presented in the assignment.
It consists of integers, structured data (in our case records), functions, named entities and predefined operations.

The following EBNF can be applied:
```
<expr> ::= <apply>
        | <name> ’->’ <expr>
<apply> ::= <basic>
        | <apply> <basic>
<basic> ::= <integer>
        | <name>
        | ’(’ <expr> ’)’
        | ’{’ [<pairs>] ’}’
<pairs> ::= <name> = <expr>
        | <pairs> ’,’ <name> = <expr>
```

## Execution
The program was developed using Javascript and NodeJS.
To execute it you can either use the bundled Files `interpreter-linux [params]` or `interpreter-win.exe [params]`.
Alternatively you can also use NodeJS and npm to execute the code directly after installing the required packages with `npm install`:
```
# using node
node src/index.js [params]

# using npm
npm run start
```

The program need serveral parameters to execute properly. You can either use the demo mode using `--demo` or you can specify an expression to evaluate. 
Important: This expression needs to be written under quotes.
It is also possible to use the Verbose-Mode with the parameter `-v` which print the execution steps and intermediate results for the lexer, parser and interpreter to the console.

Examples:
```
# demo mode with verbose output
interpreter-win.exe --demo -v

# evaluation of "plus 1 2" using verbose output
interpreter-win.exe "plus 1 2" -v

# complex evaluation of a record
interpreter-win.exe "{a=x->y->plus(mult x x)y, b=a 2, c=b 3}minus(b 5)c"
```

## Build Process (requires NodeJS and npm)
With NodeJS and npm installed the application can be executed directly using `node src/index.js [params]` or `npm run start`.
It is also possible to build the standalone executable files using the run script `npm run build`.
This command first transpiles the code to ES5 into the `./build` directory using `babel` and then bundles these files using the module `pkg`.

## Test protocol
The application used unit tests and manual test for testing.
The unit tests are located under `/test` and include tests for arithmetic operations, conditional expression, lambda expression, the lexer and the handling of records.
In total there are 30 unit tests split into the mentioned 5 test suites.
The execution of all tests approximately takes 1 seconds.

Additionally the application was tested manually with specific expressions to debug the behaviour of each component.

The handling of the parameters, including demo mode, vebose output and expression passing, were tested only manually.

## Design decisions
For our application we choose Javascript because it is a lightweight, dynamically typed language.
It is similar to Python but uses a more C-like syntax with curly brackets etc.
Originally Javascript was developed for the web but since the invention of NodeJS it can also be usesd for more traditional programs.
For our application we choose to use the ECMAScript 6 (ES6) for more readable code. This also allowed us to use the classes keyword which only is syntactic sugar. In the background the protoype-based inheritance model is still used.

Our application is split into three different components: 
* the lexer which creates tokens from the input
* the parser which transforms the tokens to an abstract syntax tree
* and the interpreter which traverses through the tree and evaluates the nodes in the tree

Each of these components can be used on its own and can also be replaced.

We also did not use inheritance but instead used composition for our nodes.

## Work distribution
The work was evenly distributed between Daniel Kleebinder (DK) and Christian Schweiger (CS).
The important work packages were:
* Basic setup of the application (CS)
* Predefined keywords (CS)
* Bracket support (CS)
* Lists, Records (DK)
* Conditional expressions (DK)
* Lambda expressions (DK)
* Documentation (CS)