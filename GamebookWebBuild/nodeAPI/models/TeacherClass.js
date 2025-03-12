const mongoose = require('mongoose');

const teacherClassSchema = new mongoose.Schema({
    teacherId:{
        type:String,
        require:true
    },
    Math:{
        type: [],
        required:true
    },
    English:{
        type: [],
        required:true
    },
    Chinese:{
        type: [],
        required:true
    },
    Social:{
        type: [],
        required:true
    },
    Science:{
        type: [],
        required:true
    }
});

const TeacherClassModel = mongoose.model("teacherClasses",teacherClassSchema); //若是沒有colliction它會自動創建
module.exports = TeacherClassModel;
