const express = require("express");
const router = express.Router();

const {
    createFoodListing,
    getAllFoodListings,
    getFoodListingById
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const foodValidationMiddleware = require("../middleware/foodValidationMiddleware");


// Public Route
router.get("/", getAllFoodListings);
router.get("/:id", getFoodListingById);

// Protected Route
router.post(
    "/",
    authMiddleware,
    roleMiddleware,
    foodValidationMiddleware,
    createFoodListing
);

module.exports = router;