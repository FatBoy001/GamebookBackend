import './Login.css';
import { useState,useContext } from 'react';
import emailjs from "emailjs-com";
import {motion} from "framer-motion";
import {UserInfo} from '../App.js';
import {ConnectConfig} from '../App.js';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';

export const LoginForgetPassword=(props)=>{
    let rand = ()=>{
        return Math.random().toString(36).substr(10);
    };
    let token = rand() + rand();

    const [isMember,setIsMember] = useState(true);
    const [send,setSend] = useState(false);
    const {setListOfTeachers,listOfTeachers}=useContext(UserInfo);
    const {IpAddress}=useContext(ConnectConfig);

    const schema = yup.object().shape({
        email: yup.string().email("不符合信箱格式").required("請輸入電子信箱")
    });
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const updateDB= (userData)=>{
        axios.put(`https://${IpAddress}/update`,{
            id:userData._id,
            newUserName:userData.userName,
            newEmail:userData.email,
            newPassword:token,
            newSchool:userData.school,
        }).then(
            setListOfTeachers(listOfTeachers.map((val)=>{
                return val.email==userData.email?{
                    _id:val._id,
                    userName:val.userName,
                    email:val.email,
                    password:token,
                    school:val.school,
                    }:val;
                })
        )).catch((e)=>console.log(e))
    }

    const findEmail =(inputData)=>{
        let count=0;
        console.log(inputData);
        listOfTeachers.map((element)=>{
            if(element.email===inputData.email){
                count++;
                console.log(inputData.email);
                updateDB(element);
                let data = {
                    email:inputData.email,
                    message:token
                };
                sendEmail(data)
                return;
            }else{
                setIsMember(false);
            }
        })
        if(count>0)
            setIsMember(true);
        else
            setIsMember(false);
    };
    function sendEmail(value){
        axios.post(`https://${IpAddress}/ForgetPassword`,value).then(() => {
            setSend(true);
        }, (error) => {
          console.log(error.text);
        });
        /* 
        ${IpAddress}emailjs.send('service_f318z3n', 'template_vd9yt7d',value, 'x7WGkU2zEHcRxqhjq')
        .then(() => {
            setSend(true);
        }, (error) => {
          console.log(error.text);
        }); */
    }

    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:[0,1]}}
        className="forgetPasswordContainer">
            <motion.div
            className='forgetPasswordNail'>  
            <form onSubmit={handleSubmit(findEmail)}>
                <table>
                    
                    <tbody>
                        <tr>
                            <td>忘記密碼</td>
                        </tr>
                        <tr>
                            <td>請輸入信箱</td>
                        </tr>
                        
                        <tr>
                            <td>
                                <input type="email" placeholder='信箱...'  name="user_email" {...register("email")}/> 
                            </td>
                        </tr>
                        {!isMember?
                        (<tr>
                            <td style={{color:"red"}}>此信箱尚未註冊!</td>
                        </tr>):(null)
                        }
                        <tr>
                            <td className='sendButton'>
                                <motion.button
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9}}>
                                送出</motion.button>
                            </td>
                        </tr>
                       
                        {send?
                        (<tr>
                            <td style={{color:"red"}}>信件已送出!請查看信箱</td>
                        </tr>):(null)
                        }
                        {errors.email?(
                        <tr>
                            <td style={{color:"red"}}>{errors.email.message}</td>
                        </tr>
                        ):null}
                        <tr>
                            <td className='exitButton'>
                                <motion.button
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9}}
                                onClick={()=>{
                                props.setShowForgetPassword(false) 
                                }}>返回</motion.button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </form>
            </motion.div>
        </motion.div>
    );
};