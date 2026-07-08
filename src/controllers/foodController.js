const prisma = require("../utils/prisma");

const createFoodListing = async (req, res) => {
    try {
        const {
            title,
            description,
            foodType,
            quantity,
            price,
            imageUrl,
            pickupType,
            expiryDate } = req.body;

        const donorId = req.user.id;

        const foodListing = await prisma.foodListing.create({
            data: {
            title,
            description,
            foodType,
            quantity,
            price,
            imageUrl,
            pickupType,
            expiryDate : new Date(expiryDate),
            donorId
            }
        });

        return res.status(201).json({
        success: true,
        message: "Food listing created successfully",
        foodListing
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const getAllFoodListings = async (req, res) => {
    try {
        const foodListings = await prisma.foodListing.findMany({
            where: {
                status: "active"
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.status(200).json({
            success: true,
            foodListings
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFoodListingById = async (req, res) => {
    try {
        const { id } = req.params;

        const foodListing = await prisma.foodListing.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!foodListing) {
            return res.status(404).json({
                success: false,
                message: "Food listing not found."
            });
        }

        return res.status(200).json({
            success: true,
            foodListing
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateFoodListing = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            title,
            description,
            foodType,
            quantity,
            price,
            imageUrl,
            pickupType,
            expiryDate
        } = req.body;

        // Check if listing exists
        const foodListing = await prisma.foodListing.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!foodListing) {
            return res.status(404).json({
                success: false,
                message: "Food listing not found."
            });
        }

        // Ownership Check
        if (foodListing.donorId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this listing."
            });
        }

        // Update Listing
        const updatedListing = await prisma.foodListing.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                description,
                foodType,
                quantity,
                price,
                imageUrl,
                pickupType,
                expiryDate: new Date(expiryDate)
            }
        });

        return res.status(200).json({
            success: true,
            message: "Food listing updated successfully.",
            updatedListing
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteFoodListing = async (req, res) => {
    try {

        const { id } = req.params;

        // Check if listing exists
        const foodListing = await prisma.foodListing.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!foodListing) {
            return res.status(404).json({
                success: false,
                message: "Food listing not found."
            });
        }

        // Ownership Check
        if (foodListing.donorId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this listing."
            });
        }

        // Delete Listing
        await prisma.foodListing.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({
            success: true,
            message: "Food listing deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createFoodListing,
    getAllFoodListings,
    getFoodListingById,
    updateFoodListing,
    deleteFoodListing
};