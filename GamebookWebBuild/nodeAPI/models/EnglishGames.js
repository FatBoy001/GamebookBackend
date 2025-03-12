const mongoose = require('mongoose');

const englishGameSchema = new mongoose.Schema({
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

const EnglishGameModel = mongoose.model("englishgames",englishGameSchema); //若是沒有colliction它會自動創建
module.exports = EnglishGameModel;