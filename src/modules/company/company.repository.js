const prisma = require("../../config/prisma");

exports.findByUserId = async (userId) => {

    return await prisma.companyProfile.findUnique({
        where: {
            userId,
        },
    });

};

exports.create = async (data) => {

    return await prisma.companyProfile.create({
        data,
    });

};

exports.update = async (
    userId,
    data
) => {

    return await prisma.companyProfile.update({
        where: {
            userId,
        },
        data,
    });

};