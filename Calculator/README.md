# Calculator

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

### Surface of an Octahedron
This program computes the surface area of an octahedron. You can use this program as follows:

```
2 Z@
```

where the first parameter indicates the length of the octahedrons sides. The program code is shown below:

```
2!*2*3_*
```

(See: https://en.wikipedia.org/wiki/Octahedron)