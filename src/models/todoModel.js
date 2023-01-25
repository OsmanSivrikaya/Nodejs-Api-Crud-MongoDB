const mongoose = require('mongoose'); //mongo paketini projeye dahil ettik

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim: true,
    },
    description:{
        type: String,
        required : true,
        trim: true,
    },
    complated:{
        type: Boolean,
        default: false
    }
},{collection: "Todo", timestamps: true}) // update ve create işlemlerinde tarih kaydetmek için

const todo = mongoose.model("Todo" , todoSchema)

module.exports = todo; //model public hale getirmek için export ediyoruz