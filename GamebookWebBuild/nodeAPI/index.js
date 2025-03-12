const express = require('express');
const app = express();
const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TeacherModel = require('./models/Teacher');
const StudentModel = require('./models/Student');
const MathGameModel = require('./models/MathGames');
const MathDoungeon = require('./models/MathDungeon');
const EnglishGameModel = require('./models/EnglishGames');
const SocialGameModel = require('./models/SocialGames');
const ChineseGameModel = require('./models/ChineseGames');
const ScienceGameModel = require('./models/ScienceGames');
const TeacherClassModel = require('./models/TeacherClass');
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'a1083365@mail.nuk.edu.tw',
        pass: 'nhspuudgubylcvij'
    }
    });
require("dotenv").config();
const cors = require('cors');
const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(
    "mongodb+srv://A1083365:A1083365@gamebook.zmyoydr.mongodb.net/Gamebook?retryWrites=true&w=majority"
,{useNewUrlParser: true, useUnifiedTopology: true});
//會顯示在http://localhost:3001/getTeachers當中
/*老師資料擷取*/
app.get("/nodeAPI/getTeachers",(req,res)=>{
    TeacherModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});
/*Forget password*/
app.post("/nodeAPI/ForgetPassword",(req,res)=>{
    //nhspuudgubylcvij是在應用程式密碼設定的
    let mailOptions = {
        from: '"Gamebook service" <a1083365@mail.nuk.edu.tw>',
        to: req.body.email,
        subject: 'Gamebook account service',
        text: `你的新密碼是： ${req.body.message}\n登入後請立即至個人資料修改！`
      };
    //console.log(req.message);
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    res.send("thereIsData");
});

/******/

/*update*/
app.put("/nodeAPI/update",async (req,res)=>{
    const newUserName = req.body.newUserName;
    const newEmail = req.body.newEmail;
    const newPassword = req.body.newPassword;
    const newSchool = req.body.newSchool;
    const id = req.body.id;
    try{
        await TeacherModel.findById(id,(error,data)=>{
            data.userName = newUserName;
            data.email = newEmail;
            data.password = newPassword;
            data.School =newSchool;
            data.save();
        }).clone();
    }catch(err){
        console.log(err);
    }
});
/*insert*/
app.post("/nodeAPI/createAccount",async (req,res)=>{
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const school = req.body.school;   
    
    let noData = false;
    TeacherModel.find({'email':email},async (err,result)=>{
        if(err){
            res.json(err);
        }else{
            
            if(result.length===0){
                const teacher = new TeacherModel({userName:userName,email:email,password:password,school:school});
                await teacher.save();

                TeacherModel.find({'email':email,'password':password},(err,result)=>{
                    if(err){
                        res.json(err)//錯誤訊息
                    }else{
                        res.json(result);//取的從資料庫取得的東西
                    }
                });

            }else{
                res.send("thereIsData");
            }
        }
    })
});


/*老師資料擷取*/

/*teacher class*/
app.get("/nodeAPI/getTeacherClass",(req,res)=>{
    TeacherClassModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});
/* 新增 */  
app.post("/nodeAPI/createClass",async (req,res)=>{
    const teacherId = req.body.teacherId;
    const math = [];
    const english = [];
    const chinese = [];
    const social = [];
    const science = [];
    const teacherClass = new TeacherClassModel({teacherId:teacherId,Math:math,English:english,Chinese:chinese,Social:social,Science:science});
    await teacherClass.save() 
    
});
/* 更新 */
app.put("/nodeAPI/updateTeacherClass",async (req,res)=>{ 
    const newMath = req.body.newMath;
    const newEnglish = req.body.newEnglish;
    const newChinese = req.body.newChinese;
    const newSocial = req.body.newSocial;
    const newScience = req.body.newScience;
    const id = req.body.id;
    try{
        await TeacherClassModel.findById(id,(error,data)=>{
            data.Math=newMath;
            data.English=newEnglish;
            data.Chinese=newChinese;
            data.Social =newSocial;
            data.Science = newScience;
            data.save();
        }).clone();
        res.json("update it!");
    }catch(err){
        console.log(err);
    }

});
/*teacher class*/

/*遊戲資料*/
/*MathGames*/
app.get("/nodeAPI/getMathGames",(req,res)=>{
    MathGameModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});

/* EnglishGame */
app.get("/nodeAPI/getEnglishGames",(req,res)=>{
    EnglishGameModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});

/* SocialGame */
app.get("/nodeAPI/getSocialGames",(req,res)=>{
    SocialGameModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});

/* Chinese */
app.get("/nodeAPI/getChineseGames",(req,res)=>{
    ChineseGameModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});

/* Science */
app.get("/nodeAPI/getScienceGames",(req,res)=>{
    ScienceGameModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});

/*遊戲資料*/
/* forchart */
/* 全班遊戲平均 */

app.post("/nodeAPI/getGames",async (req,res)=>{
    const game = req.body.game;
    const type = req.body.type;
    switch(type){
        case("Math"):
            MathGameModel.find({game:game},async (err,result)=>{
                if(err){
                    res.json(err)//錯誤訊息
                }else{
                    res.json(result);//取的從資料庫取得的東西
                }
            })
            return;
    } 
});

/* 全班遊戲平均 */
/* 全班玩的次數 */

app.post("/nodeAPI/getClassStudent",async (req,res)=>{
    const Class = req.body.Class;
    StudentModel.find({Class:Class},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});
/* 全班玩的次數 */
/* 學生資料擷取 */
app.get("/nodeAPI/getStudents",(req,res)=>{
    StudentModel.find({},(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            res.json(result);//取的從資料庫取得的東西
        }
    });
});
/* 學生資料擷取 */
/* 遊戲根據時間擷取擷取 */
app.post("/nodeAPI/getGameInRange",async (req,res)=>{
    const game = req.body.game;
    const type = req.body.type;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    switch(type){
        case("Math"):
            MathDoungeon.find({
                game:game,
                date: {
                    $gt: new Date(startTime), 
                    $lt: new Date(endTime)
                }
            },async (err,result)=>{
                if(err){
                    res.json(err)//錯誤訊息
                }else{
                    res.json(result);//取的從資料庫取得的東西
                }
            })
            return;
    } 
});

/* 學生資料擷取 */

/* Unity */
/*
    Unity Login
*/
app.post('/nodeAPI/Login', async (req, res) => {
    console.log("login...");
    let response = {};
    const { rEmail, rPassword } = req.body;
    
    //擋非法req
    if(rEmail == null)
    {
        response.code = 1;
        response.msg = "Invalid credentials";
        res.send(response);
        return;
    }
    
    let userAccount = await StudentModel.findOne({ email: rEmail}, 'email password');
    
    if(userAccount != null){
        if(userAccount.password ==rPassword){
            
            response.code = 0;
            response.msg = "Account found";
            response.student_id = userAccount._id;
            response.data = ( ({email}) => ({ email }) )(userAccount);
            res.send(response);
            console.log("login success");
            return;
        }else{
           
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            console.log("login erro");
            return;
        }
        /*
        argon2i.verify(userAccount.password, rPassword).then(async (success) => {
            if(success){
                response.code = 0;
                response.msg = "Account found";
                response.student_id = userAccount._id;
                response.data = ( ({email}) => ({ email }) )(userAccount);
                res.send(response);
                console.log("login success");
                return;
            }
            else{
                response.code = 1;
                response.msg = "Invalid credentials";
                res.send(response);
                console.log("login erro");
                return;
            }
        });*/
    }
    else{
        response.code = 1;
        response.msg = "Invalid credentials";
        res.send(response);
        return;
    }
});

/*
    Unity Create
*/
app.post('/nodeAPI/Create', async (req, res) => {
    let response = {};
    console.log("Create...");
    const { rEmail,rUsername, rPassword,rSchool,rClass } = req.body;
    /* if(rEmail == null || rEmail.length < 3 || rEmail.length > 24)
    {
        response.code = 1;
        response.msg = "Invalid credentials";
        res.send(response);
        return;
    } */

    if(!passwordRegex.test(rPassword))
    {
        response.code = 3;
        response.msg = "Unsafe password";
        res.send(response);
        return;
    }

    let userAccount = await StudentModel.findOne({ email: rEmail},'_id');
    if(userAccount == null){
        // Create a new account
        console.log("Create new account...")
        // Generate a unique access token
        let newAccount = new StudentModel({
            userName : rUsername,
            email : rEmail,
            password : rPassword,
            school:rSchool,
            Class:rClass,
        });

        await newAccount.save();
        response.code = 0;
        response.msg = "Account found";
        response.data = ( ({email}) => ({ email }) )(newAccount);
        res.send(response);
        return;
    } else {
        response.code = 2;
        response.msg = "Email is already taken";
        res.send(response);
    }
    return;
});

app.post("/nodeAPI/addGameRecord",async (req, res)=>{
    let response = {};
    const { rType,rGame,rEndTime,rScore,rStudent_oid } = req.body;
    switch(rType){
        case("Math"):
            switch(rGame){
                case("mathDungeon"):
                    let record = new MathDoungeon({
                        student_oid:rStudent_oid,
                        game:rGame,
                        end_time:rEndTime,
                        score:rScore,
                        date:new Date()
                    });
                    await record.save();
                    response.code = 1;
                    res.send(response);
                    return;
            }
            return;
        default:
            response.code = 0;
            res.send(response);
            return;
    }
});
/*
    Search MathDoungeon
*/
app.post("/nodeAPI/SearchGameRecord",async(req,res)=>{
    const { rType,rGame,rStudent_oid } = req.body;
    switch(rType){
        case("Math"):
            MathGameModel.find({student_oid:rStudent_oid,game:rGame},(err,result)=>{
            if(err){
                res.json(err)//錯誤訊息
            }else{
                let form = {
                    Items:result
                }
                res.send(form);//取的從資料庫取得的東西
            }
            });
            return;
        default:
            return;
    }
    
});

app.post("/nodeAPI/getProfile",async (req,res)=>{
    const id = req.body.id;
    await StudentModel.findById(id,(err,result)=>{
        if(err){
            res.json(err)//錯誤訊息
        }else{
            console.log(result);
            res.send(result);//取的從資料庫取得的東西
        }
    }).clone();;
});

app.post("/nodeAPI/UpdateProfile",async (req,res)=>{
    const {id,userName,password,email,school,Class} = req.body;
    if(userName == null||password ==null||email==null||school==null||Class==null) return;
    try{
        await StudentModel.findById(id,(error,data)=>{
            data.userName=userName;
            data.email=email;
            data.password=password;
            data.school =school;
            data.Class = Class;
            data.save();
            res.send(data);
        }).clone();
        
    }catch(err){
        console.log(err);
    }
});
/* 
app.put("/nodeAPI/updateTeacherClass",async (req,res)=>{ 
    const newMath = req.body.newMath;
    const newEnglish = req.body.newEnglish;
    const newChinese = req.body.newChinese;
    const newSocial = req.body.newSocial;
    const newScience = req.body.newScience;
    const id = req.body.id;
    try{
        await TeacherClassModel.findById(id,(error,data)=>{
            data.Math=newMath;
            data.English=newEnglish;
            data.Chinese=newChinese;
            data.Social =newSocial;
            data.Science = newScience;
            data.save();
        }).clone();
        res.json("update it!");
    }catch(err){
        console.log(err);
    }
});
*/

app.listen(8800,()=>{
    console.log('connect!')
}); 