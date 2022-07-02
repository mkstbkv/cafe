const express = require('express');
const Review = require('../models/Review');

const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const places = await Review.find();
        return res.send(places);
    } catch(e) {
        next(e);
    }
});


module.exports = router;
