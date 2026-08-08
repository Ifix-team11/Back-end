const prisma = require("../../config/prisma");

exports.create = async (data) => {
    return prisma.order.create({
        data,
    });
};

exports.findById = async (id) => {
    return prisma.order.findUnique({
        where: {
            id,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    fullName: true,
                    phone: true,
                },
            },
            technician: true,
            company: true,
        },
    });
};

exports.findByCustomerId = async (customerId) => {
    return prisma.order.findMany({
        where: {
            customerId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

exports.findByTechnicianId = async (technicianId) => {
    return prisma.order.findMany({
        where: {
            technicianId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

exports.findByCompanyId = async (companyId) => {
    return prisma.order.findMany({
        where: {
            companyId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

exports.findAvailable = async (status = "PENDING") => {
    return prisma.order.findMany({
        where: {
            status,
            technicianId: null,
            companyId: null,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

exports.updateStatus = async (id, data) => {
    return prisma.order.update({
        where: {
            id,
        },
        data,
    });
};
