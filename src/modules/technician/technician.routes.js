const express = require("express");
const router = express.Router();

const technicianController = require("./technician.controller");
const { protect } = require("../../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Technician
 *   description: Technician management endpoints
 */

/**
 * @swagger
 * /api/technicians:
 *   post:
 *     tags:
 *       - Technician
 *     summary: Create technician profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialization
 *               - city
 *               - detailsLocation
 *             properties:
 *               specialization:
 *                 type: string
 *                 example: Plumbing
 *               city:
 *                 type: string
 *                 example: Cairo
 *               detailsLocation:
 *                 type: string
 *                 example: Nasr City
 *     responses:
 *       201:
 *         description: Technician profile created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/technicians/{userId}:
 *   get:
 *     tags:
 *       - Technician
 *     summary: Get technician profile
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "b8d9c8e1-1234-4567"
 *     responses:
 *       200:
 *         description: Technician profile fetched successfully
 *       404:
 *         description: Technician profile not found
 */

router.post(
    "/",
    protect,
    technicianController.create
);

router.get(
    "/:userId",
    technicianController.getProfile
);

module.exports = router;