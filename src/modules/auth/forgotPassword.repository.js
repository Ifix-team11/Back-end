const prisma = require("../../config/prisma");

exports.findUserByPhone = async (phone) => {
    return prisma.user.findUnique({
        where: {
            phone,
        },
    });
};

exports.createOtp = async (data) => {
    return prisma.passwordResetOtp.create({
        data,
    });
};


exports.findLatestOtp = async (phone) => {
    return prisma.passwordResetOtp.findFirst({
        where: {
            phone,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

exports.updatePassword = async (phone, password) => {
    return prisma.user.update({
        where: {
            phone,
        },
        data: {
            password,
        },
    });
};

exports.markOtpAsUsed = async (id) => {
    return prisma.passwordResetOtp.update({
        where: {
            id,
        },
        data: {
            isUsed: true,
        },
    });
};


exports.invalidateOldOtps = async (phone) => {
    return prisma.passwordResetOtp.updateMany({
        where: {
            phone,
            isUsed: false,
        },
        data: {
            isUsed: true,
        },
    });
};