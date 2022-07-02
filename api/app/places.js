const express = require('express');
const Place = require('../models/Place');
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

router.get("/", async (req, res, next) => {
    try {
        const places = await Place.find().populate('user', 'displayName');
        return res.send(places);
    } catch(e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const place = await Place.findById(req.params.id).populate('user', 'displayName');
        return res.send(place);
    } catch(e) {
        next(e);
    }
});

router.post("/", auth, permit('admin', 'user'), upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.iAgree || (req.body.iAgree && req.body.iAgree === false)) {
            return res.status(400).send({error: 'Disagreed'});
        }
        if (!req.body.title || !req.body.description) {
            return res.status(400).send({message: 'Title, description, image are required!'});
        }

        const placeData = {
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
            image: null
        };

        if (req.file) {
            placeData.image = req.file.filename;
        }

        const place = new Place(placeData);
        await place.save();
        return res.send(place);
    } catch(e) {
        next(e);
    }
});

module.exports = router;
