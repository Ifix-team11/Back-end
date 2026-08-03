const repository = require("./forgotPassword.repository");
const jwt = require("jsonwebtoken");
exports.sendOtp = async (phone) => {

    // التأكد من وجود المستخدم
    const user = await repository.findUserByPhone(phone);

    if (!user) {
        throw new Error("User not found");
    }

    // إلغاء أي OTP قديم لنفس الرقم
    await repository.invalidateOldOtps(phone);

    // إنشاء OTP عشوائي مكون من 6 أرقام
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // صلاحية الكود 5 دقائق
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // حفظ الـ OTP
    await repository.createOtp({
        phone,
        otp,
        expiresAt,
    });

    return {
        message: "OTP sent successfully",
        otp, // مؤقتًا للتجربة فقط
    };
};


exports.verifyOtp = async (phone, otp) => {

    // جلب آخر OTP
    const savedOtp = await repository.findLatestOtp(phone);

    if (!savedOtp) {
        throw new Error("OTP not found");
    }

    // التحقق من أنه لم يُستخدم
    if (savedOtp.isUsed) {
        throw new Error("OTP already used");
    }

    // التحقق من انتهاء الصلاحية
    if (savedOtp.expiresAt < new Date()) {
        throw new Error("OTP has expired");
    }

    // التحقق من صحة الكود
    if (savedOtp.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    const resetToken = jwt.sign(
        {
            phone,
            purpose: "reset-password",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10m",
        }
    );

    await repository.markOtpAsUsed(savedOtp.id);

    return {
        message: "OTP verified successfully",
        resetToken,
    };
};

const bcrypt = require("bcrypt");

exports.resetPassword = async (data) => {

    // التحقق من تطابق كلمة المرور
    if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
    }

    let decoded;

    try {
        decoded = jwt.verify(
            data.resetToken,
            process.env.JWT_SECRET
        );
    } catch (error) {
        throw new Error("Invalid or expired reset token");
    }

    // التحقق من نوع الـ Token
    if (decoded.purpose !== "reset-password") {
        throw new Error("Invalid reset token");
    }

    // التأكد من وجود رقم الهاتف داخل الـ Token
    if (!decoded.phone) {
        throw new Error("Invalid reset token");
    }

    // تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(
        data.password,
        10
    );

    // تحديث كلمة المرور
    await repository.updatePassword(
        decoded.phone,
        hashedPassword
    );

    return {
        message: "Password reset successfully",
    };
};