// Async handler to eliminate repetitive try-catch blocks
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ 
        message: error.message || 'Server Error' 
      });
    }
  };
};

module.exports = asyncHandler; 