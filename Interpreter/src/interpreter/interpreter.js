import InterpreterError from "./interpreter-error.js";
import SymbolRegistry from "../symbols/symbol-registry.js";
import {
  AccessNode,
  AssignNode,
  BinaryOperationNode,
  BinaryOperations,
  ConcatNode,
  ConditionNode,
  FunctionCallNode,
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
    this.#globalSymbols.set(name, node.assignmentExpr);
    return "<variable assign>";
  }

  #handleAccessNode(node) {
    const name = node.identifier;
    const ref = this.#globalSymbols.get(name);
    return this.#evalNode(ref);
  }

  #handleFunctionCallNode(node) {
    const { name, argument } = node;
    const fun = this.#globalSymbols.get(name);
    if (fun == null) {
      throw new InterpreterError(`Function with name "${name}" not declared`);
    }


    // I create a temporal context for this function here. The arguments value
    // will be removed afterwards.
    const evaluatedParameter = this.#evalNode(argument);

    // Create a copy of the previous frame and use a new symbol registry for this function call.
    this.#globalSymbols = new SymbolRegistry(this.#globalSymbols);
    this.#globalSymbols.set(fun.argument, evaluatedParameter);
    const result = this.#evalNode(fun.body);

    // Restore the parent scope state.
    this.#globalSymbols = this.#globalSymbols.parent;

    return result;
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

  #handleConcatNode(node) {
    return node.expressions
      .map(expr => this.#evalNode(expr))
      .flat(1);
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

    if (node instanceof FunctionCallNode) {
      return this.#handleFunctionCallNode(node);
    }

    if (node instanceof ConcatNode) {
      return this.#handleConcatNode(node);
    }

    return node;
  }
}

export default Interpreter;
