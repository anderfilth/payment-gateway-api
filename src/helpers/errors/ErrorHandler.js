const convertErrorToObject = (err, debugMode) => ({
  key: err.key || 'ERROR_NOT_HANDLED',
  statusCode: err.statusCode,
  Date: new Date(),
  message: err.message,
  detail: err.detail,
  stack: debugMode ? err.stack : undefined,
});

const handleError = (err, debugMode = false) => {
  let ret;
  if (!err.isArray) {
    ret = {
      statusCode: (err.definition || err).statusCode || 500,
      response: convertErrorToObject(err.definition || err, debugMode),
    };
  } else {
    ret = {
      statusCode: err.definition[0].statusCode || 500,
      response: err.definition.map(def => convertErrorToObject(def, debugMode)),
    };
  }
  return ret;
};

export default handleError;
