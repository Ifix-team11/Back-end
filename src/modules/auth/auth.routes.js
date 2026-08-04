const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const forgotPasswordController = require("./forgotPassword.controller");


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - password
 *               - confirmPassword
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Ahmed Mohamed
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ahmed@gmail.com
 *               phone:
 *                 type: string
 *                 example: "01273635463"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               confirmPassword:
 *                 type: string
 *                 example: "12345678"
 *               role:
 *                 type: string
 *                 enum:
 *                   - CUSTOMER
 *                   - COMPANY
 *                   - TECHNICIAN
 *                 example: CUSTOMER
 *               howDidYouHear:
 *                 type: string
 *                 example: Facebook
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post(
    "/register",
    authController.register
);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01273635463"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid phone or password
 */


router.post(
    "/login",
    authController.login
);


/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send OTP to reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01273635473"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: User not found
 */

router.post(
    "/forgot-password",
    forgotPasswordController.forgotPassword
);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01273635473"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *                 resetToken:
 *                   type: string
 *                   description: Token used to reset the password
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid or expired OTP
 */

router.post(
    "/verify-otp",
    forgotPasswordController.verifyOtp
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetToken
 *               - password
 *               - confirmPassword
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               confirmPassword:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 */
router.post(
    "/reset-password",
    forgotPasswordController.resetPassword
);


module.exports = router;