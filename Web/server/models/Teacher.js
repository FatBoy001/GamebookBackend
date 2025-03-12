const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    school:{
        type:String,
        required:true
    }
    
});

const TeacherModel = mongoose.model("teachers",teacherSchema); //若是沒有colliction它會自動創建
module.exports = TeacherModel;
