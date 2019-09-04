const mergeMessage = (message, values) => {
  let ret = message || '';
  const replaces = { ...(values || {}) };
  Object.keys(replaces).forEach(key => {
    ret = ret.replace(new RegExp(key, 'g'), replaces[key]);
  });
  return ret;
};

class Exception {
  constructor(definition) {
    this.definition = definition;
    this.date = new Date();
    this.isArray = (definition || {}).constructor === Array;
  }

  static generateCustomError(errorDefinition) {
    const mergeDef = (def, stack) => ({
      ...def,
      message: mergeMessage(def.message, def.values),
      detail: mergeMessage(def.detail, def.values),
      stack: def.stack || stack,
    });

    let definition;
    const native = new Error();
    if ((errorDefinition || {}).constructor === Array) {
      definition = errorDefinition.map(def => mergeDef(def, native.stack));
    } else {
      definition = mergeDef(errorDefinition, native.stack);
    }
    return definition;
  }

  static raise(errorDefinition) {
    throw new Exception(Exception.generateCustomError(errorDefinition));
  }
}

module.exports = Exception;
