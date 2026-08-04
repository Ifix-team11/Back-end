const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("./auth.repository");

exports.register = async (data) => {

    // التحقق من تطابق كلمة المرور
    if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
    }

    // التحقق من عدم وجود رقم الهاتف
    const userWithPhone = await userRepository.findByPhone(
        data.phone
    );

    // التحقق من عدم وجود البريد الإلكتروني (إذا تم إدخاله)
    if (data.email) {

        const userWithEmail = await userRepository.findByEmail(
            data.email
        );

        if (userWithEmail) {
            throw new Error("Email already exists");
        }
    }

    if (userWithPhone) {
        throw new Error("Phone already exists");
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(
        data.password,
        10
    );

    // التحقق من صحة الـ role
    const allowedRoles = [
        "CUSTOMER",
        "COMPANY",
        "TECHNICIAN"
    ];

    if (!allowedRoles.includes(data.role)) {
        throw new Error("Invalid role");
    }
    // إنشاء المستخدم
    const user = await userRepository.create({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role,
        howDidYouHear: data.howDidYouHear,
    });

    return user;
};

exports.login = async (data) => {

    // البحث عن المستخدم باسم المستخدم
    const user = await userRepository.findByPhone(
        data.phone
    );

    if (!user) {
        throw new Error("Invalid username or password");
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid phone or password");
    }

    // إنشاء JWT Token
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            phone: user.phone,
            role: user.role,
        },
    };
};