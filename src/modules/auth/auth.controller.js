const authService = require("./auth.service");

exports.register = async (req, res) => {
    try {

        const user = await authService.register(req.body);

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

exports.login = async (req, res) => {
    try {

        const result = await authService.login(req.body);

        res.status(200).json({
            message: "Login successful",
            ...result
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};