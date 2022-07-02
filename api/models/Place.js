const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: true,
    },
    image: {
        type: String,
        default: true,
    },
    rate: {
        type: Number
    }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;