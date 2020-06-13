const router = require("express").Router();
const userController = require("../controllers/user.js");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../.env");

verifyJwt = (req, res, next) => {
  var token = req.headers["token"];
  if (!token) {
    return res.send({
      status: "failed",
      message: "provide a token",
    });
  }
  jwt.verify(token, process.env.secret, function (err, decoded) {
    if (decoded) {
      let email = decoded.email;
      let savedId=decoded._id
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return res.send({
              status: "Failed",
              message: "User not found",
            });
          }if(savedId !== req.params.id){
            return res.send({
                status: "Failed",
                message: "you are not the owner of this account",
              });
          } else {
            return next();
          }
        })
        .catch((err) =>
          res.send({
            status: "failed",
            message: err,
          })
        );
    } else {
      res.send({ status: "failed", message: "Error getting requested url" });
    }
  });
};

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.put('/changepassword/:id', verifyJwt, userController.changePassword)


module.exports = router;
