export const asyncHandler = (controllerMethod) => async (req, res, next) => {
    try {
      await controllerMethod(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  