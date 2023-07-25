const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // unique: true is not a validator, it's just a shortcut to create an index in the background
    password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator); // mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.
module.exports = mongoose.model('User', userSchema); // The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
