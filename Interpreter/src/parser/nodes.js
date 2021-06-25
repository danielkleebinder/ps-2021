/**
 * This file defines the nodes for the abstract snytax tree
 */


/**
 * The root node contains a bunch of statements at the programs root level.
 */
class RootNode {
  constructor(statements = []) {
    this.statements = statements;
  }
}

/**
 * Single integer value.
 */
class IntegerNode {
  constructor(value) {
    this.value = value;
  }
}

/**
 * Binary operations consist of two operands and an operation that has
 * to be evaluated.
 */
class BinaryOperationNode {
  constructor(leftNode, rightNode, op) {
    this.leftNode = leftNode;
    this.rightNode = rightNode;
    this.op = op;
  }
}

/**
 * Enum-like object of the available binary operations
 */
const BinaryOperations = {
  PLUS: "PLUS",
  MINUS: "MINUS",
  DIV: "DIV",
  MULT: "MULT",
};

/**
 * Unary operations consist of one operand and an operation that has
 * to be evaluated.
 */
class UnaryOperationNode {
  constructor(node, op) {
    this.node = node;
    this.op = op;
  }
}

/**
 * Enum-like object of the available unary operations
 */
const UnaryOperations = {
  NEGATE: "-",
};

/**
 * A conditional node which consists of a condition,
 * a ifCase which represents the leaf if the condition is true
 * a elseCase which represents the leaf if the condition is false
 */
class ConditionNode {
  constructor(condition, ifCase, elseCase) {
    this.condition = condition;
    this.ifCase = ifCase;
    this.elseCase = elseCase;
  }
}

/**
 * A node representing a recording.
 * Consisting of multiple PairsNodes
 */
class RecordNode {
  constructor(pairsNode) {
    this.pairsNode = pairsNode;
  }
}

/**
 * A node representing a pair <name> = <expr>
 */
class PairsNode {
  constructor(pairs = []) {
    this.pairs = pairs;
  }
}

/**
 * A node representing an assignment.
 * Consisting of the identifier and the assigned expression
 */
class AssignNode {
  constructor(identifier, assignmentExpr) {
    this.identifier = identifier;
    this.assignmentExpr = assignmentExpr;
  }
}

/**
 * A node representing a variable accessor.
 * Consisting of the identifier.
 */
class AccessNode {
  constructor(identifier) {
    this.identifier = identifier;
  }
}

/**
 * A node representing a function.
 * It consists of the arguments of the function and the body
 */
class FunctionNode {
  constructor(argument, body) {
    this.argument = argument;
    this.body = body;
  }
}

/**
 * A node representing a function call.
 * It consists of the name of the function which is called 
 * and the arguments used as parameters
 */
class FunctionCallNode {
  constructor(name, argument) {
    this.name = name;
    this.argument = argument;
  }
}

export {
  RootNode,
  IntegerNode,
  BinaryOperationNode,
  UnaryOperationNode,
  BinaryOperations,
  UnaryOperations,
  ConditionNode,
  RecordNode,
  AssignNode,
  AccessNode,
  FunctionNode,
  FunctionCallNode,
  PairsNode,
};
