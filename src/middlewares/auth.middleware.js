const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

exports.protect = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer") {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};