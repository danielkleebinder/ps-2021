import { IntegerNode, BinaryOperationNode, BinaryOperations } from "./nodes.js";

class Interpreter {
  interpret(node) {
    if (node instanceof IntegerNode) {
      return this.handleIntegerNode(node);
    }
    if (node instanceof BinaryOperationNode) {
      return this.handleBinaryOperationNode(node);
    }
    // TODO: Throw error
    return null;
  }

  handleIntegerNode(node) {
    return node.value;
  }

  handleBinaryOperationNode(node) {
    switch (node.op) {
      case BinaryOperations.PLUS:
        return node.leftNode.value + node.rightNode.value;
      case BinaryOperations.MINUS:
        return node.leftNode.value - node.rightNode.value;
      case BinaryOperations.MULT:
        return node.leftNode.value * node.rightNode.value;
      case BinaryOperations.DIV: // TODO: Check for division by null
        return node.leftNode.value / node.rightNode.value;
    }
  }
}

export default Interpreter;
