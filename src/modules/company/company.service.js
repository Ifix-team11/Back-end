const companyRepository = require("./company.repository");
const { uploadFile } = require("../../services/storage.service");


exports.createProfile = async (
    userId,
    data,
    files
) => {

    const existingProfile =
        await companyRepository.findByUserId(userId);

    if (existingProfile) {
        throw new Error("Company profile already exists");
    }


    if (!files?.commercialRegister?.length) {
        throw new Error(
            "Commercial register is required."
        );
    }


    const commercialRegisterUrl =
        await uploadFile(
            files.commercialRegister[0],
            "company-documents"
        );


    let licenseUrl = null;
    let logoUrl = null;


    if (files?.license?.length) {
        licenseUrl = await uploadFile(
            files.license[0],
            "company-documents"
        );
    }


    if (files?.logo?.length) {
        logoUrl = await uploadFile(
            files.logo[0],
            "company-documents"
        );
    }


    return await companyRepository.create({
        userId,
        specialization: data.specialization,
        city: data.city,
        detailsLocation: data.detailsLocation,
        commercialRegisterUrl,
        licenseUrl,
        logoUrl,
    });
};