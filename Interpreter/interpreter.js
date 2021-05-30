import { IntegerNode, BinaryOperationNode, BinaryOperations } from "./nodes.js";

class Interpreter {
  interpret(node) {
    if (node instanceof IntegerNode) {
      return this.#handleIntegerNode(node);
    }
    if (node instanceof BinaryOperationNode) {
      return this.#handleBinaryOperationNode(node);
    }
    // TODO: Throw error
    return null;
  }

  #handleIntegerNode(node) {
    return node.value;
  }

  #handleBinaryOperationNode(node) {
    switch (node.op) {
      case BinaryOperations.PLUS:
        return this.#evalNode(node.leftNode) + this.#evalNode(node.rightNode);
      case BinaryOperations.MINUS:
        return this.#evalNode(node.leftNode) - this.#evalNode(node.rightNode);
      case BinaryOperations.MULT:
        return this.#evalNode(node.leftNode) * this.#evalNode(node.rightNode);
      case BinaryOperations.DIV: // TODO: Check for division by null
        return this.#evalNode(node.leftNode) / this.#evalNode(node.rightNode);
    }
  }

  #evalNode(node) {
    if (node instanceof IntegerNode) {
      return node.value;
    }

    if (node instanceof BinaryOperationNode) {
      return this.#handleBinaryOperationNode(node);
    }
  }
}

export default Interpreter;
