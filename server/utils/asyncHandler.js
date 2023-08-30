const asyncHandler = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => next(error));
};

export default asyncHandler;
