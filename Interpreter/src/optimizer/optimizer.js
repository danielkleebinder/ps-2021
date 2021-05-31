import { deepCloneNode, mapNodes } from "./utils.js";
import { AccessNode } from "../parser/nodes.js";


/**
 * Inlines the function argument. All access nodes of the function argument
 * will be replaced by the given value.
 * @param fn Function to inline.
 * @param value Replacement value.
 * @returns {*}
 */
function inlineFunctionArgument(fn, value) {
  return mapNodes(
    deepCloneNode(fn.body),
    child => child instanceof AccessNode && child.identifier === fn.argument,
    child => value,
  );
}

export {
  inlineFunctionArgument,
};
