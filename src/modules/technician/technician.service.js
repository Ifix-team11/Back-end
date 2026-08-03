const technicianService = require("./technician.service");

exports.create = async (req, res) => {
    try {

        const result = await technicianService.createTechnicianProfile(
            req.user.id,
            req.body
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

exports.getProfile = async (req, res) => {
    try {

        const result = await technicianService.getTechnicianProfile(
            req.params.userId
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};