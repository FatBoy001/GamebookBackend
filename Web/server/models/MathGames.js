const mongoose = require('mongoose');

const mathGameSchema = new mongoose.Schema({  
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
    score:{
        type:Number,
        required:true,
    }
});

const MathGameModel = mongoose.model("mathgames",mathGameSchema,"mathgames"); //若是沒有colliction它會自動創建
module.exports = MathGameModel;
