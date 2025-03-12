import './Login.css';
import {motion} from "framer-motion";
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import {UserInfo} from '../App.js';
import { LoginForgetPassword } from './LoginForgetPassword';


export const Login=()=>{
    const {listOfTeachers}=useContext(UserInfo);
    const[email,setEmail]=useState([]);
    const[password,setPassword]=useState([]);
    const[showForgetPassword,setShowForgetPassword]=useState(false);
    const navigate = useNavigate();

    const login = ()=>{
        let userData;
        listOfTeachers.forEach(data => {
            if(email===data.email && password===data.password)
                userData =  data;
        });
        if(userData!==undefined){
            cookie.remove('userLogin',{ path: '/'});
            document.cookie = `userLogin=${JSON.stringify(userData)};`;
            alert("登入成功");
            navigate("/");
            return
        }
        alert("登入失敗");
    }
    
    


    return (
        <motion.div className="loginPage">
            {showForgetPassword?<LoginForgetPassword setShowForgetPassword={setShowForgetPassword}/>:null}
                <motion.form onSubmit={()=>login()}>
                    <motion.table animate={{scale:[0,1.2,1]}} initial={{scale:0}} className='inputCollection'>
                    <tbody>
                        <motion.tr>
                            <motion.td className='title'>登入</motion.td>
                        </motion.tr>
                        <motion.tr>
                            <motion.td>電子信箱</motion.td>
                        </motion.tr>
                        <motion.tr>
                            <motion.td><motion.input className='textBox email' placeholder='電子信箱...' type="email" onChange={(event)=>{setEmail(event.target.value)}}/></motion.td>
                        </motion.tr>
                        <motion.tr>
                            <motion.td>密碼</motion.td>
                        </motion.tr>
                        <motion.tr>
                            <motion.td><motion.input className='textBox password' placeholder='密碼...' type="password"  onChange={(event)=>{setPassword(event.target.value)}}/></motion.td>
                        </motion.tr>
                        <motion.tr>
                            <motion.td
                            className='forgotPassword'
                            whileHover={{scale:1.01}}
                            whileTap={{scale:0.95}}
                            onClick={()=>{
                                setShowForgetPassword(true);
                            }}>
                            忘記密碼</motion.td>
                        </motion.tr>
                        <motion.tr>
                            <motion.td>
                                <motion.input
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9}}
                                className='submitButton' 
                                type="submit" value="送出"/></motion.td>
                        </motion.tr>
                    </tbody>
                    {/* 必須加上否則當form被update時會有些bug */}
                    </motion.table>  
                </motion.form>
            
        </motion.div>
    );
};