import './Update.css';
import { useState,useContext } from "react";
import {motion} from "framer-motion";
import cookie from 'js-cookie';
import { useNavigate,useParams } from "react-router-dom";
import {UserInfo} from '../../App.js';
import {ConnectConfig} from '../../App.js';
import axios from 'axios';

export const InsertClass=()=>{
    const navigate = useNavigate();
    const {Subject}=useParams();
    const {listOfTeachers,listOfClass,setListOfClass}=useContext(UserInfo);
    const {IpAddress}=useContext(ConnectConfig);
    const [grade,setGrade]=useState("");
    const [classes,setClasses]=useState("");
    
    /*取得課程資料*/
    const userCookie = JSON.parse(cookie.get('userLogin'));
    let userData;
    let userClass;
    listOfTeachers.forEach((data)=>{
        if(data._id===userCookie._id){
            userData = data
            return null;
        };
    })
    
    listOfClass.forEach((data)=>{
        if(data.teacherId===userCookie._id){
            userClass = data
            return null;
        };
    })
    if(!userData) return;
    if(!userClass) return;
    
    /*-----updateDB(userClass._id);-----*/
    const updateDB= (id)=>{
        let classUpdate =`${grade}年${classes}班`;
        axios.put(`https://${IpAddress}/updateTeacherClass`,{
            id:id,
            newMath:Subject==="Math"?[...userClass["Math"],classUpdate]:userClass["Math"],
            newEnglish:Subject==="English"?[...userClass["English"],classUpdate]:userClass["English"],
            newChinese:Subject==="Chinese"?[...userClass["Chinese"],classUpdate]:userClass["Chinese"],
            newSocial:Subject==="Social"?[...userClass["Social"],classUpdate]:userClass["Social"],
            newScience:Subject==="Science"?[...userClass["Science"],classUpdate]:userClass["Science"]
        }).then(
            ()=>{
                setListOfClass(listOfClass.map((val)=>{

                    return val._id===id?{
                            _id:id,
                            teacherId:val.teacherId,
                            Math:Subject==="Math"?[...userClass["Math"],classUpdate]:userClass["Math"],
                            English:Subject==="English"?[...userClass["English"],classUpdate]:userClass["English"],
                            Chinese:Subject==="Chinese"?[...userClass["Chinese"],classUpdate]:userClass["Chinese"],
                            Social:Subject==="Social"?[...userClass["Social"],classUpdate]:userClass["Social"],
                            Science:Subject==="Science"?[...userClass["Science"],classUpdate]:userClass["Science"]
                        }:val;
                    })
                )
                navigate(`/Profile/ShowClass/${Subject}`);
            }
            ).catch((e)=>console.log(e))
    }
 

    return (
        <motion.div className="back">
                <motion.div className="card"
                exit={{scaleX:[1,0],x:[0,400],opacity:0}}
                animate={{scaleX:[0,1],x:[400,0],opacity:1}}
                initial={{scaleX:0,x:400,opacity:0}}
                transition={{duration:0.5}}>
                <div className='updateTitleCard'>{Subject}</div>
                <table className='updateInfo'>
                    <tbody>  
                        <tr>
                            <td className='tableInfo'>新增班級</td>
                        </tr>
                        <tr>
                            <td className='tableInfo'>
                            <input
                            className='textBox'
                            type='number'
                            required
                            onChange={(event)=>{setGrade(event.target.value)}}></input></td>
                            <td>
                                年
                            </td>
                            <td className='tableInfo'><input
                            className='textBox'
                            type='number'
                            required
                            onChange={(event)=>{setClasses(event.target.value)}}></input>
                            </td>
                            <td>
                                班
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{paddingTop:"10px",textAlign:"center"}}>
                                <motion.button
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9}}
                                className='comfirm updateComfirm'
                                onClick={()=>{
                                    updateDB(userClass._id);
                                }}>確認</motion.button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='updateFooter'>
                    <motion.div 
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    className='returnButton'
                    onClick={()=>{
                        navigate(`/Profile/ShowClass/${Subject}`)
                    }}>返回</motion.div>
                </div>
                </motion.div>
            </motion.div>
    );
};