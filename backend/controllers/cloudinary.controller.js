const cloudinary = require("../config/cloudinary.config");

const uploadFile = async (file, publicId, folder) => {
    console.log("Uploading Avatar");

    const uploadedAvatar = await cloudinary.uploader.upload(file, {
        upload_preset: "unsigned_upload",
        public_id: publicId,
        allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
    })

    return uploadedAvatar;


};

const renameFile = async (oldPublicId, newPublicId) => {
    try {
        const renamedFile = await cloudinary.uploader.rename(
            oldPublicId,
            newPublicId
        );
        return renamedFile;
    } catch (err) {
        console.log(err);
    }
};

const deleteFile = async (publicId) => {
    try {
        const status = await cloudinary.uploader.destroy(publicId);
        return status;
    } catch (err) {
        console.log(err);
    }
};

module.exports = { uploadFile, renameFile, deleteFile };
