const router = require('express').Router();
const subscriptionController = require('../controllers/subscriptions');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

verifyUser = (req, res, next) => {
  let token = req.headers['token'];
  if (!token) {
    return res.status(403).send({
      message: 'Token not available, Provide one',
    });
  }
  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (decoded) {
      let email = decoded.email;
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return res.status(500).send({ message: 'User Not Found' });
          } else {
            return next();
          }
        })
        .catch((err) => {
          res.send({ stack: err.stack, message: err.message });
        });
    }
  });
};
router.post('/subscribe', verifyUser, subscriptionController.subscribe);
router.get(
  '/subscriptions/all',
  verifyUser,
  subscriptionController.getSubscriptions
);
router.get(
  '/subscription/:sub_id',
  verifyUser,
  subscriptionController.getSubscription
);
router.put(
  '/subscription/:sub_id',
  verifyUser,
  subscriptionController.updateSubscription
);
router.delete(
  '/subscription/:sub_id',
  verifyUser,
  subscriptionController.deleteSubscription
);

router.get(
  '/subscription/subscriber/:sub_id', verifyUser,
  subscriptionController.subscriber
);

module.exports = router;
