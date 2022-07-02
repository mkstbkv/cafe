const express = require('express');
const Review = require('../models/Review');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
    try {
        const reviews = await Review.find({place: req.params.id}).populate('user', 'displayName');
        return res.send(reviews);
    } catch(e) {
        next(e);
    }
});

router.post("/", auth, permit('admin', 'user'), async (req, res, next) => {
    try {
        if (!req.body.text || !req.body.foodRate || !req.body.serviceRate || !req.body.interiorRate || !req.body.place) {
            return res.status(400).send(
            {message: 'PlaceID, Text, foodRate, serviceRate, interiorRate are required!'});
        }

        const reviewData = {
            user: req.user._id,
            place: req.body.place,
            text: req.body.text,
            foodRate: req.body.foodRate,
            serviceRate: req.body.serviceRate,
            interiorRate: req.body.interiorRate,
        };

        const review = new Review(reviewData);
        await review.save();
        return res.send(review);
    } catch(e) {
        next(e);
    }
});


module.exports = router;
