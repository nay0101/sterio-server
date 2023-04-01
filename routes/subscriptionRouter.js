const express = require("express");
const router = express.Router();
const subscription = require("../controllers/SubscriptionController");

router.get("/", subscription.getAllSubscriptions);
router.get("/:user_id", subscription.getOneSubscription);
router.post("/", subscription.subscribe);

module.exports = router;
