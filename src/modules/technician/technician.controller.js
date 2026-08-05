const technicianService = require("./technician.service");

exports.create = async (req, res) => {
    try {

        const technician = await technicianService.createTechnicianProfile(
            req.user.id,
            req.body,
            req.files
        );

        res.status(201).json({
            message: "Technician profile created successfully",
            technician,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};


exports.getMyProfile = async (req, res) => {
    try {

        const technician = await technicianService.getTechnicianProfile(
            req.user.id
        );

        if (!technician) {
            return res.status(404).json({
                message: "Technician profile not found",
            });
        }

        res.status(200).json({
            message: "Technician profile fetched successfully",
            technician,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};


exports.getProfile = async (req, res) => {
    try {

        const technician = await technicianService.getTechnicianProfile(
            req.params.userId
        );

        if (!technician) {
            return res.status(404).json({
                message: "Technician profile not found",
            });
        }

        res.status(200).json({
            message: "Technician profile fetched successfully",
            technician,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};