const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {type:String, required:true},
    password : {type:String,required:true},
    role : {type:String, enum:['Admin','Manager','User']},
},{
    timestamps:true
})

const user = mongoose.model('User',UserSchema);

module.exports = user;