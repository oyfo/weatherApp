const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cities: { type: Array, required: false },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
