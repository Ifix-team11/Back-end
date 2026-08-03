const forgotPasswordService = require("./forgotPassword.service");

exports.forgotPassword = async (req, res) => {
    try {

        const result = await forgotPasswordService.sendOtp(
            req.body.phone
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};


exports.verifyOtp = async (req, res) => {
    try {

        const result = await forgotPasswordService.verifyOtp(
            req.body.phone,
            req.body.otp
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

exports.resetPassword = async (req, res) => {
    try {

        const result = await forgotPasswordService.resetPassword(req.body);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};