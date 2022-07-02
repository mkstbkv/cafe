const express = require('express');
const Image = require('../models/Image');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get("/:id", async (req, res, next) => {
    try {
        const images = await Image.find({place: req.params.id}).populate('user', 'displayName');
        return res.send(images);
    } catch(e) {
        next(e);
    }
});

router.post("/", auth, permit('admin', 'user'), upload.single('image'), async (req, res, next) => {
    try {
        const imageData = {
            user: req.user._id,
            place: req.body.place,
            image: null
        };

        if (req.file) {
            imageData.image = req.file.filename;
        }

        const image = new Image(imageData);
        await image.save();
        return res.send(image);
    } catch(e) {
        next(e);
    }
});



module.exports = router;
