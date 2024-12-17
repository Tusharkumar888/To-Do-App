const { default: mongoose } = require("mongoose");
mongoose.connect(process.env.DATABASE_URL)

const usreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    surname: {
        type: String,
        required: true
      },
    userName: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    gender: {
        type: String,
        required: true
      },
    password: {
        type: String,
        required: true
      },
})


const User = mongoose.model('user', usreSchema);

module.exports = User