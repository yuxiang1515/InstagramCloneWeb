var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
    img: String,
    text: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ], 
    author: {
        username: String, 
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});

module.exports = mongoose.model('Photo', photoSchema);