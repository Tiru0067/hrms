module.exports = function throwError(status, message) {
  const err = new Error(message);
  err.status = status;
  throw err;
};
