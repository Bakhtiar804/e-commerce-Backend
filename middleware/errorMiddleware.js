
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send({
    status: err.statusCode || 500,
    message: err.message ||'Something went wrong!'
 });
};
export default errorHandler;