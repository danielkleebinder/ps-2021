class IntegerNode {
  constructor(value) {
    this.value = value;
  }
}

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

class VarAccessNode {
  constructor(identifier) {
    this.identifier = identifier;
  }
}

class ConditionNode {
  constructor(condition, ifCase, elseCase) {
    this.condition = condition;
    this.ifCase = ifCase;
    this.elseCase = elseCase;
  }
}

export {
  IntegerNode,
  BinaryOperationNode,
  UnaryOperationNode,
  BinaryOperations,
  UnaryOperations,
  VarAccessNode,
  ConditionNode,
};
