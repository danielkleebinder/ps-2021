/*************************************************************************/
/* Defines the nodes of the abstract syntax tree                         */

/*************************************************************************/

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

const BinaryOperations = {
  PLUS: "PLUS",
  MINUS: "MINUS",
  DIV: "DIV",
  MULT: "MULT",
};

class UnaryOperationNode {
  constructor(node, op) {
    this.node = node;
    this.op = op;
  }
}

const UnaryOperations = {
  NEGATE: "-",
};

class ConditionNode {
  constructor(condition, ifCase, elseCase) {
    this.condition = condition;
    this.ifCase = ifCase;
    this.elseCase = elseCase;
  }
}

class RecordNode {
  constructor(pairsNode) {
    this.pairsNode = pairsNode;
  }
}

class PairsNode {
  constructor(pairs = []) {
    this.pairs = pairs;
  }
}

class AssignNode {
  constructor(identifier, assignmentExpr) {
    this.identifier = identifier;
    this.assignmentExpr = assignmentExpr;
  }
}

class AccessNode {
  constructor(identifier) {
    this.identifier = identifier;
  }
}

class FunctionNode {
  constructor(argument, body) {
    this.argument = argument;
    this.body = body;
  }
}

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
