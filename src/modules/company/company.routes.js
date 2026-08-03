const express = require("express");
const router = express.Router();

const companyController = require("./company.controller");
const { protect } = require("../../middlewares/auth.middleware");

/**
 * @swagger
 * /api/company/profile:
 *   post:
 *     tags:
 *       - Company
 *     summary: Create company profile
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
 *                 example: "Electrical"
 *               city:
 *                 type: string
 *                 example: "Cairo"
 *               detailsLocation:
 *                 type: string
 *                 example: "Nasr City"
 *     responses:
 *       201:
 *         description: Company profile created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.post(
    "/profile",
    protect,
    companyController.createProfile
);

module.exports = router;