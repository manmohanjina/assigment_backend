const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const userPassedToken = req.headers.authorization;

  const decode_token = jwt.verify(userPassedToken, "heroku", (err, decode) => {
    if (err) {
      console.log(err);
      res.send({ error: "Invalid Token" });
    } else {
      next();
    }
  });
  
};

module.exports = {
  authenticate,
};
