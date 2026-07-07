const roleMiddleware = (req, res, next) => {
    // Allow only donors
    if (req.user.role !== "donor") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Only donors can perform this action."
        });
    }

    // User is a donor
    next();

};

module.exports = roleMiddleware;