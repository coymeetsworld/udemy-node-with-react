const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
const { Schema } = mongoose; // Same as commented line above (ES2015 destructuring)

const userSchema = new Schema({
  googleID: String
});

// Won't create this twice, if it exists it won't override existing collections.
mongoose.model('users', userSchema);
