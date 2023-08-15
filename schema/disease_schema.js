const mongoose = require('mongoose')

const diseaseSchema = mongoose.Schema({
    userId: {type: String, required: true},
    diseaseInfo: {type: Object},
    createdAt: {type:Date, default: Date.now()},
    updateAt: {type:Date},

})

module.exports = mongoose.model('DiseaseSchema', diseaseSchema)