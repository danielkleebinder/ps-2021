import InterpreterError from "./interpreter-error.js";
import SymbolRegistry from "../symbols/symbol-registry.js";
import {
  AccessNode,
  AssignNode,
  BinaryOperationNode,
  BinaryOperations,
  ConditionNode,
  FunctionCallNode,
  IntegerNode,
  PairsNode,
  RecordNode,
  RootNode,
  UnaryOperationNode,
  UnaryOperations,
} from "../parser/nodes.js";

/**
 * This class interpretes a given AST and evaluates each node.
 */
class Interpreter {

  #globalSymbols;

  /**
   * Interprets the nodes of the given AST. The given node is the root node of
   * an AST.
   * @param node Root node of some AST.
   * @returns {*}
   */
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
      case BinaryOperations.DIV:
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
    this.#evalNode(node.pairsNode);
    return "<record create>";
  }

  #handlePairsNode(node) {
    node.pairs
      .forEach(pairNode => this.#evalNode(pairNode));
    return "<pairs create>";
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
    const fn = this.#globalSymbols.get(name);
    if (fn == null) {
      throw new InterpreterError(`Function with name "${name}" not declared`);
    }


    // I create a temporal context for this function here. The arguments value
    // will be removed afterwards.
    const evaluatedParameter = this.#evalNode(argument);

    // Create a copy of the previous frame and use a new symbol registry for this function call.
    this.#globalSymbols = new SymbolRegistry(this.#globalSymbols);
    this.#globalSymbols.set(fn.argument, evaluatedParameter);
    const result = this.#evalNode(fn.body);

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

    if (node instanceof PairsNode) {
      return this.#handlePairsNode(node);
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

    return node;
  }
}

export default Interpreter;
