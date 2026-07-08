const prisma = require("../utils/prisma");
const AppError = require("../errors/AppError");

const createOrder = async (req, res) => {
    try {

        const { listingId } = req.body;

        const receiverId = req.user.id;

        const order = await prisma.$transaction(async (tx) => {

            // Check if listing exists
            const listing = await tx.foodListing.findUnique({
                where: {
                    id: Number(listingId)
                }
            });

            if (!listing) {
                throw new AppError("Food listing not found.", 404);
            }

            // Check if listing is still available
            if (listing.status !== "active") {
                throw new AppError("Food has already been claimed.", 409);
            }

            // Create Order
            const newOrder = await tx.order.create({
                data: {
                    receiverId,
                    listingId: Number(listingId)
                }
            });

            // Update Listing Status
            await tx.foodListing.update({
                where: {
                    id: Number(listingId)
                },
                data: {
                    status: "claimed"
                }
            });

            return newOrder;

        });

        return res.status(201).json({
            success: true,
            message: "Food claimed successfully.",
            order
        });

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createOrder
};