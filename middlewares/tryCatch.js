export const tryCatch = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.log(`Erro in try-catch middleware :${error} `);

      res
        .status(res.statusCode < 400 ? 400 : res.statusCode || 500)
        .send(error.message);
    }
  };
};
