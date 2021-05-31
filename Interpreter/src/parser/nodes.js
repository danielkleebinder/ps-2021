class RootNode {
  constructor(statements = []) {
    this.statements = statements;
  }
}

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

class ConditionNode {
  constructor(condition, ifCase, elseCase) {
    this.condition = condition;
    this.ifCase = ifCase;
    this.elseCase = elseCase;
  }
}

class RecordNode {
  constructor(properties = []) {
    this.properties = properties;
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

class ConcatNode {
  constructor(expressions = []) {
    this.expressions = expressions;
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
  ConcatNode,
};
