import './Update.css';
import { useEffect,useState,useContext } from "react";
import {motion} from "framer-motion";
import cookie from 'js-cookie';
import { useNavigate,useParams } from "react-router-dom";
import {UserInfo} from '../../App.js';
import {ConnectConfig} from '../../App.js';
import axios from 'axios';

export const Update=()=>{
    const navigate = useNavigate();
    const {Type}=useParams();
    const {listOfTeachers,setListOfTeachers}=useContext(UserInfo);
    const {IpAddress}=useContext(ConnectConfig);

    const [updateData,setUpdateData]=useState([]);
    const [text,setText]=useState("");
    const userID = JSON.parse(cookie.get('userLogin'))._id;
    let userData;
    listOfTeachers.map((data)=>{
        if(data._id===userID){
            userData = data
        };
    })
    if(!userData) return;

    const updateDB= (id)=>{
        axios.put(`https://${IpAddress}/update`,{
            id:id,
            newUserName:Type==="userName"?updateData:userData["userName"],
            newEmail:Type==="email"?updateData:userData["email"],
            newPassword:Type==="password"?updateData:userData["password"],
            newSchool:Type==="school"?updateData:userData["school"],
        }).then(
            setListOfTeachers(listOfTeachers.map((val)=>{
                return val._id==id?{
                        _id:id,
                        userName:Type==="userName"?updateData:userData["userName"],
                        email:Type==="email"?updateData:userData["email"],
                        password:Type==="password"?updateData:userData["password"],
                        school:Type==="school"?updateData:userData["school"],
                    }:val;
                })
        )).catch((e)=>console.log(e))
        
    }
    const changeText = ()=> setText(updateData)
    
    return (
        <motion.div className="back">
                <motion.div className="card"
                exit={{scaleX:[1,0],x:[0,400],opacity:0}}
                animate={{scaleX:[0,1],x:[400,0],opacity:1}}
                initial={{scaleX:0,x:400,opacity:0}}
                transition={{duration:0.5}}>
                <div className='updateTitleCard'>{Type}</div>
                <table className='updateInfo'>
                    <tbody>  
                        <tr>
                            <td className='tableInfo'>目前名稱</td><td className='tableInfo'>{text?text:userData[Type]}</td>
                        </tr>
                        <tr>
                            <td className='tableInfo'>更改名稱</td><td className='tableInfo'><input
                            placeholder='名稱'
                            className='textBox'
                            onChange={(event)=>{setUpdateData(event.target.value)}}></input></td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{paddingTop:"10px",textAlign:"center"}}>
                                <motion.button
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9}}
                                className='comfirm updateComfirm'
                                onClick={()=>{
                                    changeText();
                                    updateDB(userData._id);
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
                        navigate("/Profile")
                    }}>返回</motion.div>
                </div>
                </motion.div>
            </motion.div>
    );
};