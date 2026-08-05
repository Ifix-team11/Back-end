const technicianRepository = require("./technician.repository");
const { uploadFile } = require("../../services/storage.service");

exports.createTechnicianProfile = async (
    userId,
    data,
    files
) => {

    if (
        !files?.idCardImage?.length ||
        !files?.graduationCertificate?.length
    ) {
        throw new Error(
            "Identity card and graduation certificate are required."
        );
    }

    const [idCardImageUrl, graduationCertificateUrl] = await Promise.all([
        uploadFile(
            files.idCardImage[0],
            "technician-documents"
        ),
        uploadFile(
            files.graduationCertificate[0],
            "technician-documents"
        ),
    ]);

    const technician = await technicianRepository.create({
        userId,
        specialization: data.specialization,
        city: data.city,
        detailsLocation: data.detailsLocation,
        idCardImage: idCardImageUrl,
        graduationCertificate: graduationCertificateUrl,
    });

    return technician;
};

exports.getTechnicianProfile = async (userId) => {

    const technician = await technicianRepository.findByUserId(userId);

    if (!technician) {
        throw new Error("Technician profile not found");
    }

    return technician;
};