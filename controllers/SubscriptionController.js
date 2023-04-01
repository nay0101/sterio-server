const Subscription = require("../models/subscriptions");

const getAllSubscriptions = async (req, res) => {
  try {
    const result = await Subscription.find();
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const getOneSubscription = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await Subscription.findOne({ user_id });
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const subscribe = async (req, res) => {
  try {
    const { subscription_duration, subscription_fees } = req.body;
    const user_id = req.user_id;
    const result = await Subscription.findOne({ user_id });
    if (result) {
      const total_subscription_duration =
        result.subscription_duration + subscription_duration;
      const total_subscription_fees =
        result.subscription_fees + subscription_fees;
      await Subscription.findByIdAndUpdate(result._id, {
        subscription_duration: total_subscription_duration,
        subscription_fees: total_subscription_fees,
        subscription_status: "Active",
      });
      return res.sendStatus(200);
    }
    await Subscription.create({
      user_id,
      subscription_duration,
      subscription_status: "Active",
      subscription_fees,
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = { getAllSubscriptions, getOneSubscription, subscribe };
