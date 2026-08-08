const orderRepository = require("./order.repository");
const technicianRepository = require("../technician/technician.repository");
const companyRepository = require("../company/company.repository");
const { uploadFile } = require("../../services/storage.service");

exports.createOrder = async (customerId, data, files) => {

    if (!data.serviceType || !data.scheduledAt || !data.problemDescription) {
        throw new Error(
            "serviceType, scheduledAt and problemDescription are required."
        );
    }

    let images = [];

    if (files?.images?.length) {
        images = await Promise.all(
            files.images.map((file) =>
                uploadFile(file, "order-attachments")
            )
        );
    }

    let voiceNoteUrl = null;

    if (files?.voiceNote?.length) {
        voiceNoteUrl = await uploadFile(
            files.voiceNote[0],
            "order-attachments"
        );
    }

    const order = await orderRepository.create({
        customerId,
        serviceType: data.serviceType,
        scheduledAt: new Date(data.scheduledAt),
        problemDescription: data.problemDescription,
        images,
        voiceNoteUrl,
    });

    return order;
};

exports.getOrderById = async (id) => {

    const order = await orderRepository.findById(id);

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};

exports.getMyOrders = async (user) => {

    if (user.role === "CUSTOMER") {
        return orderRepository.findByCustomerId(user.id);
    }

    if (user.role === "TECHNICIAN") {
        const technician = await technicianRepository.findByUserId(user.id);

        if (!technician) {
            throw new Error("Technician profile not found");
        }

        return orderRepository.findByTechnicianId(technician.id);
    }

    if (user.role === "COMPANY") {
        const company = await companyRepository.findByUserId(user.id);

        if (!company) {
            throw new Error("Company profile not found");
        }

        return orderRepository.findByCompanyId(company.id);
    }

    throw new Error("Unsupported role for this action");
};

exports.getAvailableOrders = async () => {
    return orderRepository.findAvailable("PENDING");
};

exports.updateOrderStatus = async (orderId, user, status, rejectionReason) => {

    const allowedStatuses = [
        "ACCEPTED",
        "REJECTED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
    ];

    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status value");
    }

    const order = await orderRepository.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    const data = {
        status,
    };

    if (status === "ACCEPTED") {

        if (order.technicianId || order.companyId) {
            throw new Error("Order has already been claimed");
        }

        if (user.role === "TECHNICIAN") {
            const technician = await technicianRepository.findByUserId(user.id);

            if (!technician) {
                throw new Error("Technician profile not found");
            }

            data.technicianId = technician.id;

        } else if (user.role === "COMPANY") {
            const company = await companyRepository.findByUserId(user.id);

            if (!company) {
                throw new Error("Company profile not found");
            }

            data.companyId = company.id;

        } else {
            throw new Error("Only technicians or companies can accept orders");
        }
    }

    if (status === "REJECTED") {
        data.rejectionReason = rejectionReason || null;
    }

    const updatedOrder = await orderRepository.updateStatus(orderId, data);

    return updatedOrder;
};
