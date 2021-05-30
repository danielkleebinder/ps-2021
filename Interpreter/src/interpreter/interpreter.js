import InterpreterError from "./interpreter-error.js";
import {
  BinaryOperationNode,
  BinaryOperations,
  ConditionNode,
  IntegerNode,
  UnaryOperationNode,
  UnaryOperations,
  VarAccessNode,
} from "../parser/nodes.js";

class Interpreter {
  interpret(node) {
    const result = this.#evalNode(node);
    if (result != null) {
      return result;
    }
    throw new InterpreterError(`Unknown node type: ${node?.type}`);
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

  #handleUnaryOperationNode(node) {
    switch (node.op) {
      case UnaryOperations.NEGATE:
        return -this.#evalNode(node.node);
    }
  }

  #handleVarAccessNode(node) {
  }

  #handleConditionNode(node) {
    const conditionResult = this.#evalNode(node.condition);
    if (conditionResult !== 0 && conditionResult !== "{}") {
      return this.#evalNode(node.ifCase);
    } else if (node.elseCase != null) {
      return this.#evalNode(node.elseCase);
    }
    return null;
  }

  #evalNode(node) {
    if (node instanceof IntegerNode) {
      return this.#handleIntegerNode(node);
    }

    if (node instanceof BinaryOperationNode) {
      return this.#handleBinaryOperationNode(node);
    }

    if (node instanceof UnaryOperationNode) {
      return this.#handleUnaryOperationNode(node);
    }

    if (node instanceof VarAccessNode) {
      return this.#handleVarAccessNode(node);
    }

    if (node instanceof ConditionNode) {
      return this.#handleConditionNode(node);
    }

    return null;
  }
}

export default Interpreter;
