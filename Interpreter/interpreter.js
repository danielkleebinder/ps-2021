import { IntegerNode } from "./nodes.js";

class Interpreter {
  interpret(node) {
    let result = null;
    if (node instanceof IntegerNode) {
      result = this.handleIntegerNode(node);
    }
    return result;
  }

  handleIntegerNode(node) {
    return node.value;
  }
}

export default Interpreter;
