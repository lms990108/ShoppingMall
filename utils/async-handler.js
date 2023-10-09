module.exports = (requestHandle) => {
  return async (req, res, next) => {
    try {
      await requestHandle(req, res);
    } catch (err) {
      next(err);
    }
  };
};
