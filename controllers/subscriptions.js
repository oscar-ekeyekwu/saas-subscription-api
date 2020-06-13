const Subscriptions = require('../models/subscriptions');

exports.subscribe = (req, res, next) => {
  const sub_name = req.body.sub_name,
    start_time = req.body.start_time,
    end_time = req.body.end_time;
  const plan_id = req.url.plan_id,
    user_id = req.url.user_id;

  const subscription = {
    sub_name: sub_name,
    start_time: start_time,
    end_time: end_time,
    plan: plan_id,
    user: user_id,
  };

  if (!sub_name || !start_time || !end_time) {
    res.status(400).send('Provide Data for all Fields');
    return;
  } else {
    Subscriptions.create(subscription)
      .then((sub) => {
        res.send(sub);
      })
      .catch(next);
  }
};

exports.getSubscriptions = (req, res, next) => {
  Subscriptions.find({})
    .then((subs) => {
      res.send({
        message: 'All Subscriptions retrieved Successfully',
        subscriptions: subs,
      });
    })
    .catch(next);
};

exports.getSubscription = (req, res, next) => {
  Subscriptions.findOne({ _id: req.params.sub_id })
    .then((sub) => {
      res.send({ subscription: sub });
    })
    .catch(next);
};

exports.updateSubscription = (req, res, next) => {
  const sub_id = req.params.sub_id;
  const subscription = req.body;
  Subscriptions.findByIdAndUpdate({ _id: sub_id }, subscription)
    .then(() => {
      Subscriptions.findOne({ _id: sub_id }).then((updatedSub) => {
        res.send({
          message: 'Subscription Updated Successfully',
          updated: updatedSub,
        });
      });
    })
    .catch(next);
};

exports.deleteSubscription = (req, res, next) => {
  const sub_id = req.params.sub_id;
  Subscriptions.findByIdAndDelete({ _id: sub_id })
    .then((deletedSub) => {
      res.send({
        message: 'Subscription Deleted Successfully',
        deleted: deletedSub,
      });
    })
    .catch(next);
};

exports.subscriber = (req, res, next) => {
  const { sub_id } = req.params;

  Subscriptions.findById(sub_id)
    .populate('user')
    .then((subscriber) => {
      res.send({
        message: 'Subscriber retrieved Successfully',
        subscriber: subscriber,
      });
    })
    .catch(next);
};
