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

let BinaryOperations = {
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

export {
  IntegerNode,
  BinaryOperationNode,
  UnaryOperationNode,
  BinaryOperations,
};
