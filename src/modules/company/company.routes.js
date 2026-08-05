const express = require("express");
const router = express.Router();

const companyController = require("./company.controller");
const { protect } = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload.middleware");


/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company management endpoints
 */


/**
 * @swagger
 * /api/companies:
 *   post:
 *     tags:
 *       - Company
 *     summary: Create company profile
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
 *               - commercialRegister
 *             properties:
 *               specialization:
 *                 type: string
 *                 example: Electrical
 *               city:
 *                 type: string
 *                 example: Cairo
 *               detailsLocation:
 *                 type: string
 *                 example: Nasr City
 *               commercialRegister:
 *                 type: string
 *                 format: binary
 *                 description: Upload commercial register document
 *               license:
 *                 type: string
 *                 format: binary
 *                 description: Upload company license (optional)
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Upload company logo (optional)
 *     responses:
 *       201:
 *         description: Company profile created successfully
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
            name: "commercialRegister",
            maxCount: 1,
        },
        {
            name: "license",
            maxCount: 1,
        },
        {
            name: "logo",
            maxCount: 1,
        },
    ]),
    companyController.createProfile
);


/**
 * @swagger
 * /api/companies/me:
 *   put:
 *     tags:
 *       - Company
 *     summary: Update company profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               specialization:
 *                 type: string
 *                 example: Electrical
 *               city:
 *                 type: string
 *                 example: Cairo
 *               detailsLocation:
 *                 type: string
 *                 example: Nasr City
 *               commercialRegister:
 *                 type: string
 *                 format: binary
 *               license:
 *                 type: string
 *                 format: binary
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Company profile updated successfully
 */


router.put(
    "/me",
    protect,
    upload.fields([
        {
            name: "commercialRegister",
            maxCount: 1,
        },
        {
            name: "license",
            maxCount: 1,
        },
        {
            name: "logo",
            maxCount: 1,
        },
    ]),
    companyController.updateProfile
);


module.exports = router;