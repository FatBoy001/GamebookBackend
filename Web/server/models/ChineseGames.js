const mongoose = require('mongoose');

const chineseGameSchema = new mongoose.Schema({  
    student_oid:{
        type:String,
        required:true,
    },
    game:{
        type:String,
        required:true,
    },
    end_time:{
        type:String,
        required:true,
    },
    finish:{
        type:Boolean,
        required:true
    },
    score:{
        type:Number,
        required:true,
    }
});

const ChineseGameModel = mongoose.model("chinesegames",chineseGameSchema); //若是沒有colliction它會自動創建
module.exports = ChineseGameModel;