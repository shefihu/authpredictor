const mongoose= require('mongoose')

const usersSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    imageUrl: {type: String, default: "img/default.jpg"},
    name: {type: String, default: "No Name"},
    createdAt: {type:Date, default: Date.now()},
    updateAt: {type:Date},
    
})

module.exports = mongoose.model('UsersSchema', usersSchema)