package at.tuwien.calc.command.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * This annotation tells the interpreter that the context has to be
 * in list construction mode to run it (i.e. operation mode > 0).
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface ListConstructionMode {
}
