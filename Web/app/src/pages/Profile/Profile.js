import './Profile.css';
import { useEffect,useState,useContext } from "react";
import {motion} from "framer-motion";
import cookie from 'js-cookie';
import { useNavigate } from "react-router-dom";
import {UserInfo} from '../../App.js';
import {AiOutlineForm} from 'react-icons/ai';
export const Profile=()=>{
    const navigate = useNavigate();
    const {listOfTeachers,listOfClass}=useContext(UserInfo);

    /*確認是否為手機*/
    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
    }, []);
    const isMobile = width <= 768;
    /*確認是否為手機*/

    if(!cookie.get('userLogin')) return;

    /*取得課程資料*/
    const userCookie = JSON.parse(cookie.get('userLogin'));
    let userData;
    let userClass;
    listOfTeachers.map((data)=>{
        if(data._id===userCookie._id){
            userData = data
            return;
        };
    })
    if(!userData) return;

    listOfClass.map((data)=>{
        if(data.teacherId===userCookie._id){
            userClass = data
            return;
        };
    })
    if(!userClass) return;
    /*-----------*/
    if(!userData) return;
    const {userName,email,password,school} = userData?userData:"";
    
    const textSizeControl=(text)=>{
        if(text.length<13) return text;

        let convert = "";
        for(let i=0;i<13;i++){
            convert += text[i]
        }
        convert += "..."
        return convert;
    }
    
    return(
            <motion.div className="profileBack">
                <motion.div className="profileCard"
                exit={{scaleX:[1,0],x:[0,400],opacity:0}}
                animate={{scaleX:[0,1],x:[400,0],opacity:1}}
                initial={{scaleX:0,x:400,opacity:0}}
                transition={{duration:0.5}}>
                <div className='titleCard'>教師基本資料</div>
                {isMobile?(
                    <table className='info'> 
                    <tbody className=''>
                        <tr>
                            <th colSpan="2" style={{borderStyle:"inset"}}>info</th><th style={{borderStyle:"inset"}}>修改</th>
                        </tr>
                        <tr>
                            <td>name: </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{borderStyle:"none inset none none"}}>{userName}</td>
                            <motion.td 
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/userName")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                        <tr>
                            <td>email: </td> 
                        </tr>
                        <tr>
                        <td colSpan="2" style={{borderStyle:"none inset none none"}}>{textSizeControl(email)}</td>
                            <motion.td
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/email")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                        <tr>
                            <td>password: </td>
                        </tr>
                        <tr>
                        <td colSpan="2" style={{borderStyle:"none inset none none"}}>{password}</td><motion.td
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/password")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                        <tr>
                            <td>school: </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{borderStyle:"none inset none none"}}>{school}</td><motion.td
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/school")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                    </tbody>
                </table>
                ):(
                    <table className='info'> 
                    <tbody className='infoTbody'>  
                        <tr>
                            <th colSpan="2" style={{borderStyle:"inset"}}>info</th><th style={{borderStyle:"inset"}}>修改</th>
                        </tr>
                        <tr>
                            <td>name: </td><td style={{borderStyle:"none inset none none"}}>{userName}</td><motion.td 
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/userName")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                        <tr>
                            <td>email: </td>
                            <td style={{borderStyle:"none inset none none"}}>{textSizeControl(email)}</td>
                            <motion.td
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/email")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                        <tr>
                            <td>password: </td><td style={{borderStyle:"none inset none none"}}>{password}</td><motion.td
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/password")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                        <tr>
                            <td>school: </td><td style={{borderStyle:"none inset none none"}}>{school}</td><motion.td
                            className='updateIcon'
                            whileHover={{scale:1.1,borderStyle:'none'}}
                            whileTap={{scale:0.9}}
                            onClick={()=>{
                                navigate("/Profile/Update/school")
                            }}><AiOutlineForm/></motion.td>
                        </tr>
                    </tbody>
                </table>
                )}

                
                <table className='teachClass'>
                        <tbody>   
                            <tr>
                                <td>科目</td><td>班級</td>
                            </tr>
                            <tr>
                                <td>數學</td>
                                <td>
                                    {
                                       <motion.div
                                       onClick={()=>navigate("/Profile/ShowClass/Math")}
                                       whileHover={{scale:1.1}}
                                       whileTap={{scale:0.9}}
                                       className='subjectButton'>查看更多</motion.div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>英文</td>
                                <td>
                                    {
                                       <motion.div
                                       onClick={()=>navigate("/Profile/ShowClass/English")}
                                       whileHover={{scale:1.1}}
                                       whileTap={{scale:0.9}}
                                       className='subjectButton'>查看更多</motion.div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>中文</td>
                                <td>
                                    {
                                       <motion.div
                                       onClick={()=>navigate("/Profile/ShowClass/Chinese")}
                                       whileHover={{scale:1.1}}
                                       whileTap={{scale:0.9}}
                                       className='subjectButton'>查看更多</motion.div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>社會</td>
                                <td>
                                    {
                                       <motion.div
                                       onClick={()=>navigate("/Profile/ShowClass/Social")}
                                       whileHover={{scale:1.1}}
                                       whileTap={{scale:0.9}}
                                       className='subjectButton'>查看更多</motion.div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>自然</td>
                                <td>
                                    {
                                       <motion.div
                                       onClick={()=>navigate("/Profile/ShowClass/Science")}
                                       whileHover={{scale:1.1}}
                                       whileTap={{scale:0.9}}
                                       className='subjectButton'>查看更多</motion.div>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <motion.div
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    className='logout'
                    onClick={()=>{
                        cookie.remove('userClass');
                        cookie.remove('userLogin');
                        alert('登出');
                        navigate("/Login");
                    }}>登出</motion.div>
                </motion.div>
            </motion.div>
    );
}