const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    text: {
        type: String,
        default: true,
    },
    foodRate: {
        type: Number,
        default: 0.0,
        max: 5.0
    },
    serviceRate: {
        type: Number,
        default: 0.0,
        max: 5.0
    },
    interiorRate: {
        type: Number,
        default: 0.0,
        max: 5.0
    },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;