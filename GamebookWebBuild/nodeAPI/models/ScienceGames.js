const mongoose = require('mongoose');

const scienceGameSchema = new mongoose.Schema({
    end_time:{
        type:String,
        required:true,
    },finish:{
        type:Boolean,
        required:true
    },
    student_oid:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
    }
});

const ScienceGameModel = mongoose.model("sciencegames",scienceGameSchema); //若是沒有colliction它會自動創建
module.exports = ScienceGameModel;