const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("receiver"),
    createOrder
);

module.exports = router;