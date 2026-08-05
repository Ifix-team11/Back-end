const express = require("express");
const router = express.Router();

const technicianController = require("./technician.controller");
const { protect } = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload.middleware");

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - specialization
 *               - city
 *               - detailsLocation
 *               - idCardImage
 *               - graduationCertificate
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
 *               idCardImage:
 *                 type: string
 *                 format: binary
 *                 description: Upload technician ID card image
 *               graduationCertificate:
 *                 type: string
 *                 format: binary
 *                 description: Upload graduation certificate
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
 * /api/technicians/me:
 *   get:
 *     tags:
 *       - Technician
 *     summary: Get logged in technician profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Technician profile fetched successfully
 *       404:
 *         description: Technician profile not found
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/technicians/{userId}:
 *   get:
 *     tags:
 *       - Technician
 *     summary: Get technician profile by userId
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
    upload.fields([
        {
            name: "idCardImage",
            maxCount: 1,
        },
        {
            name: "graduationCertificate",
            maxCount: 1,
        },
    ]),
    technicianController.create
);


// Get logged in technician profile
router.get(
    "/me",
    protect,
    technicianController.getMyProfile
);


// Get technician profile by userId
router.get(
    "/:userId",
    technicianController.getProfile
);


module.exports = router;