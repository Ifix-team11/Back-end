const prisma = require("../../config/prisma");

exports.findByPhone = async (phone) => {
    return prisma.user.findUnique({
        where: {
            phone,
        },
    });
};

exports.findByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

exports.create = async (data) => {
    return prisma.user.create({
        data,
        select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
        },
    });
};