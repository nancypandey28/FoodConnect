const foodValidationMiddleware = (req, res, next) => {

    const {
    title,
    foodType,
    quantity,
    expiryDate} = req.body;

    // Validate title
    if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Title is required."
        });
    }

    // Validate food type
    if (!foodType || foodType.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Food type is required."
        });
    }

    // Validate quantity
    if (!quantity || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be greater than 0."
        });
    }

    // Validate expiry date
    if (!expiryDate) {
        return res.status(400).json({
            success: false,
            message: "Expiry date is required."
        });
    }

    if (new Date(expiryDate) <= new Date()) {
        return res.status(400).json({
            success: false,
            message: "Expiry date must be in the future."
        });
    }

    // All validations passed
    next();
};


module.exports = foodValidationMiddleware;