const prisma = require("../../config/prisma");

exports.create = async (data) => {
    return prisma.technician.create({
        data,
    });
};

exports.findByUserId = async (userId) => {
    return prisma.technician.findUnique({
        where: {
            userId,
        },
    });
};