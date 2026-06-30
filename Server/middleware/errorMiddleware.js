let errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    message: err.message || "Server Error",
    status: 500,
  });
};

module.exports = errorHandler;