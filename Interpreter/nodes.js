class IntegerNode {
  constructor(token) {
    this.token = token;
  }
}

class BinaryOperationNode {
  constructor(left_node, right_node, op) {
    this.left_node = left_node;
    this.right_node = right_node;
    this.op = op;
  }
}

class UnaryOperationNode {
  constructor(node, op) {
    this.node = node;
    this.op = op;
  }
}

export { IntegerNode, BinaryOperationNode, UnaryOperationNode };
