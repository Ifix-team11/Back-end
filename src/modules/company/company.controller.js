const companyService = require("./company.service");

exports.createProfile = async (req, res) => {
    try {

        const result = await companyService.createProfile(
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