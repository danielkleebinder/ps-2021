/**
 * The symbol register is a sort of a linked list which store local variables.
 */
class SymbolRegistry {

  parent;
  #symbols;

  constructor(parent = null) {
    this.parent = parent;
    this.#symbols = {};
  }

  /**
   * Returns the value of the variable with the given name.
   * @param identifier Identifier.
   * @returns {*}
   */
  get(identifier) {
    const result = this.#symbols[identifier];
    if (result == null && this.parent != null) {
      return this.parent.get(identifier);
    }
    return result;
  }

  /**
   * Sets the value of the given identifier and registers it.
   * @param identifier Identifier.
   * @param value Value (can be anything).
   */
  set(identifier, value) {
    this.#symbols[identifier] = value;
  }

  /**
   * Removes the value with the given identifier from the register.
   * @param identifier Identifier.
   */
  remove(identifier) {
    delete this.#symbols[identifier];
  }
}

export default SymbolRegistry;
