const express = require("express");
const router = express.Router();

const {
    createFoodListing,
    getAllFoodListings,
    getFoodListingById,
    updateFoodListing,
    deleteFoodListing
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const foodValidationMiddleware = require("../middleware/foodValidationMiddleware");

// Public Routes
router.get("/", getAllFoodListings);
router.get("/:id", getFoodListingById);

// Protected Routes
router.post(
    "/",
    authMiddleware,
    roleMiddleware("donor"),
    foodValidationMiddleware,
    createFoodListing
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("donor"),
    foodValidationMiddleware,
    updateFoodListing
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("donor"),
    deleteFoodListing
);

module.exports = router;