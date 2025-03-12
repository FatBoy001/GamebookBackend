const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
        type: String,
        required:true,
    },
    Class:{
        type:String,
        required:true,
    }
});

const StudentModel = mongoose.model("students",studentSchema); //若是沒有colliction它會自動創建
module.exports = StudentModel;
