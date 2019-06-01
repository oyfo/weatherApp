const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    // hash: { type: String, required: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    // createdDate: { type: Date, default: Date.now },
    // cities: {type: String, required: true}
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cities: { type: Array, required: false },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
