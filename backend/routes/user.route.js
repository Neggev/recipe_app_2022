const router = require("express").Router();

const {
    uploadFile,

} = require("../controllers/cloudinary.controller");



router.post("/avatar", async (req, res) => {
    console.log("post");

    try {
        const uploadAvatar = await uploadFile(
            req.body.image,
            req.body.name + "-" + Date.now(),
            "avatars"
        );

        console.log("cloudinary response:" + uploadAvatar.secure_url);
        res.status(200).json(uploadAvatar)
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;
