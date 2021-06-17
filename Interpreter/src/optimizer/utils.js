/**
 * Creates an exact clone of the given ES6 class instance.
 * @param obj Object to clone.
 * @returns {any}
 */
function cloneObject(obj) {
  return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}

/**
 * Deep clones the given node. This means the given node as well as
 * all its child nodes will be cloned.
 * @param node Node to deep clone.
 * @returns {any}
 */
function deepCloneNode(node) {
  if (typeof node !== "object") {
    return node;
  }
  const clone = cloneObject(node);
  for (const key of Object.keys(clone)) {
    clone[key] = deepCloneNode(clone[key]);
  }
  return clone;
}

/**
 * Iterates through all nodes and its children. Uses a match function to identify
 * which properties should be mapped. The mapping function returns a new values
 * for a given property.
 * @param node Root node.
 * @param matchFn Matching function.
 * @param mapFn Mapping function.
 * @returns {*}
 */
function mapNodes(node, matchFn, mapFn) {
  if (typeof node !== "object") {
    return node;
  }
  for (const key of Object.keys(node)) {
    const matches = matchFn(node[key]);
    if (matches) {
      node[key] = mapFn(node[key]);
    } else {
      node[key] = mapNodes(node[key], matchFn, mapFn);
    }
  }
  return node;
}

export {
  cloneObject,
  deepCloneNode,
  mapNodes,
};
