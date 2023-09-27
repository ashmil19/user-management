const mongoose = require('mongoose')
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true 
    },
    isAccess: {
        type: Boolean,
        default: true
    },
    profileImage: {
        type: String,
        default: "person.svg"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: ''
    }

})


module.exports = mongoose.model('user', userSchema)