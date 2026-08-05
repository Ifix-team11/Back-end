const supabase = require("../config/supabase");
const { randomUUID } = require("crypto");

exports.uploadFile = async (file, bucketName) => {

    const fileExtension = file.originalname.split(".").pop();

    const fileName = `${randomUUID()}.${fileExtension}`;

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

    if (error) {
        throw new Error(error.message);
    }

    const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

    return data.publicUrl;
};