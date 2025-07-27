import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    console.log("authMiddleware called on:", req.path);
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    console.log("TOKEN RECEIVED:", token);  // Debug log
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
            error: true,
            success: false,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACESS_TOKEN);
        req.user = decoded; // Attach user info to request object
        console.log("TOKEN DECODED:", decoded);  // Debug log
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("TOKEN ERROR:", error.message);  // Debug log
        return res.status(403).json({
            
            message: "Invalid token",
            error: true,
            success: false,
        });
    }
}

export default authMiddleware;