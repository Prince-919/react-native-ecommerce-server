const asyncErrorHandler = (passedFunc) => {
  return (req, res, next) => {
    Promise.resolve(passedFunc(req, res, next)).catch(next);
  };
};

export default asyncErrorHandler;
