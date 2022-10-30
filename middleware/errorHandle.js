const { CustomApiError } = require("../erros/custom-error");

const errorHandleMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(500).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Something wrong,  try again later" });
};

module.exports = errorHandleMiddleware;
