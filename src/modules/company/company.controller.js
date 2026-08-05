const companyService = require("./company.service");


exports.createProfile = async (req, res) => {
    try {

        const result = await companyService.createProfile(
            req.user.id,
            req.body,
            req.files
        );

        res.status(201).json({
            message: "Company profile created successfully",
            company: result,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};


exports.updateProfile = async (req, res) => {
    try {

        const result = await companyService.updateProfile(
            req.user.id,
            req.body,
            req.files
        );

        res.status(200).json({
            message: "Company profile updated successfully",
            company: result,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};