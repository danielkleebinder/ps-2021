# Calculator

## Execution
The program runs with Java 11 making use of features like ``var``. Therefore, at least Java 11 has to be installed to run the program. You
can execute it either by running it inside some IDE like IntelliJ or via CLI using the following commands:

```
javac -d bin -sourcepath src -cp "." src/at/tuwien/calc/Main.java
cd bin/
java at/tuwien/calc/Main
```

The following prompt will occur:

```
Write ; and press ENTER to exit the calculator. The following programs are pre-installed:
  - W: Factorial (e.g. '6 W@' will output 720)
  - X: Triangle Area (e.g. '0 0 0 1 0 0 0 1 0 X@' will output 0.49999)
  - Y: Sum of Triangle Areas (e.g. '0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 0 2 Y@' will output 0.99999)
  - Z: Octahedron Surface Area (e.g. '2 Z@' will output [13.856406460551018, 13.856406460551021])
>
```

You can now run any stack based calculations. For example

```
> 7 3 1 + *
28.0
```

## Design Decisions
Java was the programming language of our choice since all three (initial) team members know Java (as statically typed language) the best. Java
has versatile areas of application and brings a lot of utility out of the box. Including garbage collection and platform independence.

We wanted to use a very lightweight version of the lexer, parser, interpreter pattern. However, we omitted the parser and simplified
the lexer to quite some extent since the interpreter did a more than sufficient job using the annotation and operation mode based command
technique.

We also tried to use inheritance as little as possible and relied on interfaces and annotations to configure the commands.

## Contributors
The following list shows all contributors (people who committed code) and on which package they worked.

| Package                | Contributor         |
|------------------------|---------------------|
| Numbers & Decimals     | Daniel Kleebinder   |
| Registers              | Christian Schweiger |
| Arithmetic Operators   | Christian Schweiger |
| Logical Operators      | Christian Schweiger |
| Stack Operators        | Daniel Kleebinder   |
| List Operators         | Daniel Kleebinder   |
| Testing                | Daniel Kleebinder   |
| Code Reviews           | Both                |

## Testing
The calculator comes with out-of-the box functionality which is stored in different registers.

### Surface of a Triangle
The program to calculate the surface area of a triangle is in register X. You can use this program as follows:

```
0 0 0 1 0 0 0 1 0 X@
```

Where the corners are represented by the first 9 inputs in the form `X Y Z`. The command `X@` will then execute based on the 9 values on the data stack. You can see the program input and the program code explained below:

```
0 0 0						// P1(X,Y,Z)
1 0 0						// P2(X,Y,Z)
0 1 0						// P3(X,Y,Z)
(2!6!-2!*)@(4!8!-2!*)@(6!10!-2!*)@++_		// Length between P3 and P2
(3!10!-2!*)@(5!12!-2!*)@(7!14!-2!*)@++_		// Length between P3 and P1
(7!11!-2!*)@(9!13!-2!*)@(11!15!-2!*)@++_	// Length between P2 and P1
4$4$4$4$4$4$4$4$4$				// We no longer need the point coordinates ... delete all
(4!4!4!++2/)@					// Calculate "s" (half the triangles perimeter)
(2!4!-)@(3!6!-)@(4!8!-)@***_            	// Calculate the area
2$2$2$						// The side lengths are no longer required
```

One can see that a lot of data stack manipulation needs to be done to execute programs like these.

### Sum of Triangle Surfaces
The program to calculate the collective sum of surface areas of multiple triangles is in register Y. You can use this program as follows:

```
0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 0 3 Y@
```

The program to compute the sum of all triangle areas is shown (and explained) below:

```
0 0 0 1 0 0 0 1 0                       // Triangle 1
0 0 0 1 0 0 0 1 0                       // Triangle 2
0 0 0 1 0 0 0 1 0                       // Triangle 3
3                                       // Number of triangles
(5!4!4!1-3!3!-                          // Calculate recursion parameters and recursion depth counter
 4*14+                                  // Calculate stack copy offset for next triangle
 2!!3!!4!!5!!6!!7!!8!!9!!10!!           // Copy triangle on top of stack
 11!$11!$11!$11!$11!$11!$11!$11!$11!$   // Delete old triangle values
 X@                                     // Compute triangle surface
 5!5!4$4$4$2!                           // Do recursion
 1=6!(1$1$)(4!4$1+$@)                   // Recursion conditional
 @2$2$2$+)                              // Sum up the surfaces
12!12!12!12!12!12!12!12!12!             // First triangle copy
12$12$12$12$12$12$12$12$12$             // First triangle delete
X@4!5!5$5!@2$                           // Compute surface and clean up
```

### Surface of an Octahedron
This program computes the surface area of an octahedron. You can use this program as follows:

```
2 Z@
```

where the first parameter indicates the length of the octahedrons sides. The program code is shown below:

```
(2!3!*2*3_*)@           // Compute octahedron surface (2*a^2*sqrt(3))
(3!2/,4!3_*2/,0)@       // Compute first corner coordinates
(6!6$,0,0)@             // Compute second corner coordinates
(0,0,0)@                // Compute third corner coordinates
X@                      // Run triangle surface program
8*                      // Mult with 8 since an octahedron has 8 sides of same area
```

This will output two values on the data stack:
1. The surface area according to the octahedrons formula and
2. The surface area using the calculators own triangle programs.

The second approach where the calculators register programs for triangle surface areas are used makes use of the fact, that
all sides of an octahedron have the same side lengths and therefore the same surface area. This means that only the surface
of one triangle out of 8 has to be calculated and multiplied with 8 to compute the whole octahedron surface area.

(See: https://en.wikipedia.org/wiki/Octahedron)
