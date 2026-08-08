const express = require("express");
const router = express.Router();

const orderController = require("./order.controller");
const { protect } = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload.middleware");

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Service request (order) endpoints
 */


/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Order
 *     summary: Create a new service request (تعبئة نموذج الطلب)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - serviceType
 *               - scheduledAt
 *               - problemDescription
 *             properties:
 *               serviceType:
 *                 type: string
 *                 example: غسالة
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-10T10:00:00Z"
 *               problemDescription:
 *                 type: string
 *                 example: الغسالة لا تعمل
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Optional photos of the issue (up to 5)
 *               voiceNote:
 *                 type: string
 *                 format: binary
 *                 description: Optional voice note describing the issue
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    protect,
    upload.fields([
        {
            name: "images",
            maxCount: 5,
        },
        {
            name: "voiceNote",
            maxCount: 1,
        },
    ]),
    orderController.create
);


/**
 * @swagger
 * /api/orders/me:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get orders for the logged in user (customer / technician / company)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/me",
    protect,
    orderController.getMyOrders
);


/**
 * @swagger
 * /api/orders/available:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get pending orders that have not been claimed yet (for technicians / companies)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Available orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/available",
    protect,
    orderController.getAvailableOrders
);


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get order by id (تتبع حالة الطلب)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 */
router.get(
    "/:id",
    protect,
    orderController.getById
);


/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     tags:
 *       - Order
 *     summary: Accept / reject / update order status (هل تم قبول الطلب؟)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACCEPTED, REJECTED, IN_PROGRESS, COMPLETED, CANCELLED]
 *               rejectionReason:
 *                 type: string
 *                 example: الفني غير متاح في هذا التوقيت
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.patch(
    "/:id/status",
    protect,
    orderController.updateStatus
);


module.exports = router;
