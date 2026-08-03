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