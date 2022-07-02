const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    image: {
        type: String,
        default: true,
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;