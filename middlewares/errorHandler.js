// errorMiddleware.js

function errorHandler(err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err.stack);
  
    // Check if headers have already been sent
    if (res.headersSent) {
      return next(err);
    }
  
    // Check for specific error types and handle accordingly
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Handle other errors
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
export default  errorHandler;
  