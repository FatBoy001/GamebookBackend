import './CreateAccount.css';
import {motion} from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState,useContext } from "react";
import Axios from "axios";
import {ConnectConfig} from '../App.js';
import cookie from "js-cookie";

export const CreateAccount=()=>{
    const [success,setSuccess] = useState(true);
    const {IpAddress}=useContext(ConnectConfig);
    const schema = yup.object().shape({
        userName: yup.string("必須包含字母或者中文字").required("未輸入使用者名稱"),
        email: yup.string().email("不符合信箱格式").required("未輸入電子信箱"),
        password: yup.string().required("未輸入密碼").matches(/.*[A-Za-z]+.*/,"至少一個英文字母"),
        confirmPassword: yup
            .string("")
            .oneOf([yup.ref("password"),null],"與密碼不同")
            .required("未輸入確認密碼"),
        school: yup.string("").required("未輸入密碼")
    });
    const {register,handleSubmit,reset,formState:{errors}} = useForm({
        resolver: yupResolver(schema),
    });
    if(!cookie.get('userLogin')) return;

    const onSt = (data,e)=>{
        let info = {
            userName:data.userName,
            email:data.email,
            password:data.password,
            school:data.school
        };
        addAccount(info,e); 
    }
    
    const addAccount = (info,element)=>{
        
        Axios.post(`https://${IpAddress}/createAccount`,info)
        .then((response)=>{ 
            if(response.data==='thereIsData'){
                alert("帳號曾建立過!");
                return;
            }
            Axios.post(`https://${IpAddress}/createClass`,{
                teacherId:response.data[0]._id,
            })
        }).then(()=>{
            setSuccess(true);
            alert("帳號成功建立")
            reset();
        })
    }

    return (
        <div className="insertContainer">
            <motion.form
            exit = {{scale:[1,1.2,0]}}
            animate={{scale:[0,1.2,1]}} initial={{scale:0}}
            className="insertNail"
            onSubmit={handleSubmit(onSt)}>
                <table>
                    <tbody>
                    <tr><td id="nailTitle">新增帳號</td></tr>
                    <tr><td className="nailContent">使用者姓名 :</td></tr>
                    <tr>
                        <td>
                        <input
                        className="nailInput"
                        {...register("userName")}
                        placeholder="姓名..."/>
                        </td>
                    </tr>
                    <tr><td className="nailError">{errors.userName?.message}</td></tr>
                    <tr><td className="nailContent">電子信箱 :</td></tr>
                    <tr>
                        <td>
                        <input
                        className="nailInput"
                        {...register("email")}
                        placeholder="電子信箱..."/>
                        </td>
                    </tr>
                    <tr><td className="nailError">{errors.email?.message}</td></tr>
                    
                    <tr><td className="nailContent">密碼 :</td></tr>
                    <tr>
                        <td>
                        <input
                        className="nailInput"
                        type = "password"
                        {...register("password")}
                        placeholder="密碼..."/>
                        </td>
                    </tr>
                    <tr><td className="nailError">{errors.password?.message}</td></tr>

                    <tr><td className="nailContent">確認密碼 :</td></tr>
                    <tr>
                        <td>
                        <input
                        className="nailInput"
                        type = "password"
                        {...register("confirmPassword")}
                        placeholder="密碼..."/>
                        </td>
                    </tr>
                    <tr><td className="nailError">{errors.confirmPassword?.message}</td></tr>

                    <tr><td className="nailContent">所屬學校 :</td></tr>
                    <tr>
                        <td>
                        <input
                        className="nailInput"
                        {...register("school")}
                        placeholder="學校..."/>
                        </td>
                    </tr>
                    <tr><td className="nailError">{errors.school?.message}</td></tr>
                    </tbody>
                </table>
                <motion.button
                id="nailButton"
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                >
                送出
                </motion.button>
            </motion.form>
            
        </div>
    );
};