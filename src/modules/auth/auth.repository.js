

const prisma = require("../../config/prisma");

exports.findByPhone = async (phone) => {
    return prisma.user.findUnique({
        where: {
            phone,
        },
    });
};

exports.create = async (data) => {
    return prisma.user.create({
        data,
        select: {
            id: true,
            fullName: true,
            phone: true,
            role: true,
            createdAt: true,
        },
    });
};

