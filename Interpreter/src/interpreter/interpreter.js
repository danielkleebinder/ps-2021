import InterpreterError from "./interpreter-error.js";
import SymbolRegistry from "../symbols/symbol-registry.js";
import {
  AccessNode,
  AssignNode,
  BinaryOperationNode,
  BinaryOperations,
  ConditionNode,
  IntegerNode,
  RecordNode,
  RootNode,
  UnaryOperationNode,
  UnaryOperations,
} from "../parser/nodes.js";


class Interpreter {

  #globalSymbols;

  interpret(node) {
    this.#globalSymbols = new SymbolRegistry();
    const result = this.#evalNode(node);
    if (result != null) {
      return result;
    }
    throw new InterpreterError(`Unknown node type: ${node?.type}`);
  }

  #handleRootNode(node) {
    const result = node.statements
      .map(statement => this.#evalNode(statement))
      .filter(evaluatedResult => evaluatedResult != null);
    return result.length === 1 ? result[0] : result;
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

  #handleRecordNode(node) {
    node.properties.forEach(property => this.#evalNode(property));
    return "<record create>";
  }

  #handleAssignNode(node) {
    const name = node.identifier;
    const value = this.#evalNode(node.assignmentExpr);
    this.#globalSymbols.set(name, value);
    return "<variable assign>";
  }

  #handleAccessNode(node) {
    const name = node.identifier;
    return this.#globalSymbols.get(name);
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
    if (node instanceof RootNode) {
      return this.#handleRootNode(node);
    }

    if (node instanceof IntegerNode) {
      return this.#handleIntegerNode(node);
    }

    if (node instanceof BinaryOperationNode) {
      return this.#handleBinaryOperationNode(node);
    }

    if (node instanceof UnaryOperationNode) {
      return this.#handleUnaryOperationNode(node);
    }

    if (node instanceof RecordNode) {
      return this.#handleRecordNode(node);
    }

    if (node instanceof AssignNode) {
      return this.#handleAssignNode(node);
    }

    if (node instanceof AccessNode) {
      return this.#handleAccessNode(node);
    }

    if (node instanceof ConditionNode) {
      return this.#handleConditionNode(node);
    }

    return null;
  }
}

export default Interpreter;
