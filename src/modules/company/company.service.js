const companyRepository = require("./company.repository");

exports.createProfile = async (userId, data) => {

    const existingProfile =
        await companyRepository.findByUserId(userId);

    if (existingProfile) {
        throw new Error("Company profile already exists");
    }

    return await companyRepository.create({
        userId,
        ...data,
    });
};