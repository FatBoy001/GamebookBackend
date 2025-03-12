import './ShowClass.css';
import { useEffect,useState,useContext } from "react";
import {motion} from "framer-motion";
import cookie from 'js-cookie';
import { useNavigate,useParams } from "react-router-dom";
import {UserInfo} from '../../App.js';
import {ConnectConfig} from '../../App.js';
import {AiOutlineForm,AiFillDelete} from 'react-icons/ai';
import axios from 'axios';


export const ShowClass=()=>{
    const navigate = useNavigate();
    const {Subject}=useParams();
    const {listOfTeachers,listOfClass,setListOfClass}=useContext(UserInfo);
    const [width, setWidth] = useState(window.innerWidth);
    const [isDelete,setIsDelete]=useState(false);
    const {IpAddress}=useContext(ConnectConfig);

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

    /*取得課程資料*/
    const userCookie = JSON.parse(cookie.get('userLogin'));
    let userData;
    let userClass;
    listOfTeachers.map((data)=>{
        if(data._id===userCookie._id){
            userData = data
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
    /*************/
    const deleteDB= (id,classDelete)=>{
        let classAfterDelete =  userClass[Subject].filter((value)=>{
            return value!=classDelete;
        });
        axios.put(`https://${IpAddress}/updateTeacherClass`,{
            id:id,
            newMath:Subject==="Math"?classAfterDelete:userClass["Math"],
            newEnglish:Subject==="English"?classAfterDelete:userClass["English"],
            newChinese:Subject==="Chinese"?classAfterDelete:userClass["Chinese"],
            newSocial:Subject==="Social"?classAfterDelete:userClass["Social"],
            newScience:Subject==="Science"?classAfterDelete:userClass["Science"]
        }).then(
            setListOfClass(listOfClass.map((val)=>{
                return val._id==id?{
                        _id:id,
                        teacherId:val.teacherId,
                        Math:Subject==="Math"?classAfterDelete:userClass["Math"],
                        English:Subject==="English"?classAfterDelete:userClass["English"],
                        Chinese:Subject==="Chinese"?classAfterDelete:userClass["Chinese"],
                        Social:Subject==="Social"?classAfterDelete:userClass["Social"],
                        Science:Subject==="Science"?classAfterDelete:userClass["Science"]
                    }:val;
                })
        )).catch((e)=>console.log(e))
    }
    /*-----------*/
    const classSplit =(msg)=>{
        let config = /[班年]/;
        return msg.split(config,2);
    }
    
    return (
        <motion.div className="back">
                {isMobile?<div className='classTitleCard'>{Subject}</div>:null}
                {isMobile?
                (
                    /*mobile*/
                    <motion.div className="classCard"
                    style={{overflow:"hiden"}}
                    exit={{scaleX:[1,0],x:[0,400],opacity:0}}
                    animate={{scaleX:[0,1],x:[400,0],opacity:1}}
                    initial={{scaleX:0,x:400,opacity:0}}
                    transition={{duration:0.5}}>    
                    <table className='classMobile'> 
                    <tbody>
                        <tr>
                            <td style={{textAlign:"center", borderStyle:"solid",color:"white",backgroundColor:"rgb(32, 32, 35)"}}>1年級</td>
                        </tr>
                            {
                                userClass[Subject].map((data,key)=>{
                                    let arr = classSplit(data);
                                    if(arr[0]!=1) return;
                                    return (
                                        <tr key={key}>
                                        <td>{data} {isDelete?
                                            <AiFillDelete color={"red"} onClick={()=>{
                                                deleteDB(userClass._id,data)
                                            }} className="deleteButton"/>
                                        :null}</td>
                                    </tr>
                                        )
                                }) 
                            }
                        <tr>
                            <td style={{textAlign:"center", borderStyle:"solid",color:"white",backgroundColor:"rgb(32, 32, 35)"}}>2年級</td>
                        </tr>
                        {
                            userClass[Subject].map((data,key)=>{
                                let arr = classSplit(data);
                                if(arr[0]!=2) return;
                                    return (
                                        <tr key={key}>
                                            <td>{data} {isDelete?
                                                <AiFillDelete color={"red"} onClick={()=>{
                                                    deleteDB(userClass._id,data)
                                                }} className="deleteButton"/>
                                            :null}</td>
                                        </tr>
                                    )
                            }) 
                        }
                        <tr>
                            <td style={{textAlign:"center", borderStyle:"solid",color:"white",backgroundColor:"rgb(32, 32, 35)"}}>3年級</td>
                        </tr>
                        {
                            userClass[Subject].map((data,key)=>{
                                let arr = classSplit(data);
                                if(arr[0]!=3) return;
                                    return (
                                        <tr key={key}>
                                            <td>{data} {isDelete?
                                                <AiFillDelete color={"red"} onClick={()=>{
                                                    deleteDB(userClass._id,data)
                                                }} className="deleteButton"/>
                                            :null}</td>
                                        </tr>
                                    )
                            }) 
                        }
                        <tr>
                            <td style={{textAlign:"center", borderStyle:"solid",color:"white",backgroundColor:"rgb(32, 32, 35)"}}>4年級</td>
                        </tr>
                        {
                            userClass[Subject].map((data,key)=>{
                                let arr = classSplit(data);
                                if(arr[0]!=4) return;
                                    return (
                                        <tr key={key}>
                                            <td>{data} {isDelete?
                                                <AiFillDelete color={"red"} onClick={()=>{
                                                    deleteDB(userClass._id,data)
                                                }} className="deleteButton"/>
                                            :null}</td>
                                        </tr>
                                    )
                            }) 
                        }
                        <tr>
                            <td style={{textAlign:"center", borderStyle:"solid",color:"white",backgroundColor:"rgb(32, 32, 35)"}}>5年級</td>
                        </tr>
                        {
                            userClass[Subject].map((data,key)=>{
                                let arr = classSplit(data);
                                if(arr[0]!=5) return;
                                    return (
                                        <tr key={key}>
                                            <td>{data} {isDelete?
                                                <AiFillDelete color={"red"} onClick={()=>{
                                                    deleteDB(userClass._id,data)
                                                }} className="deleteButton"/>
                                            :null}</td>
                                        </tr>
                                    )
                            }) 
                        }
                        <tr>
                            <td style={{textAlign:"center", borderStyle:"solid",color:"white",backgroundColor:"rgb(32, 32, 35)"}}>6年級</td>
                        </tr>
                        {
                            userClass[Subject].map((data,key)=>{
                                let arr = classSplit(data);
                                if(arr[0]!=6) return;
                                    return (
                                        <tr key={key}>
                                            <td>{data} {isDelete?
                                                <AiFillDelete color={"red"} onClick={()=>{
                                                    deleteDB(userClass._id,data)
                                                }} className="deleteButton"/>
                                            :null}</td>
                                        </tr>
                                    )
                            }) 
                        }
                    
                    </tbody>
                </table>
                
                </motion.div>
                ):(
                    /*browser*/
                    <motion.div className="classCard"
                    exit={{scaleX:[1,0],x:[0,400],opacity:0}}
                    animate={{scaleX:[0,1],x:[400,0],opacity:1}}
                    initial={{scaleX:0,x:400,opacity:0}}
                    transition={{duration:0.5}}>    
                    <div className='classTitleCard'>{Subject}</div>
                    <table className='class'> 
                    <tbody>
                        <tr>
                            <td>年級</td><td>班級</td>
                        </tr>
                        <tr>
                            <td>1年級</td>
                            {
                                userClass[Subject].map((data,key)=>{
                                    let arr = classSplit(data);
                                    if(arr[0]!=1) return;
                                    return (
                                        <td key={key}>{data} {isDelete?
                                            <AiFillDelete color={"red"} onClick={()=>{
                                                deleteDB(userClass._id,data)
                                            }} className="deleteButton"/>
                                        :null}</td>
                                    )
                                }) 
                            }
                        </tr>
                        <tr>
                            <td>2年級</td>
                            {
                                userClass[Subject].map((data,key)=>{
                                    let arr = classSplit(data);
                                    if(arr[0]!=2) return;
                                    return (
                                        <td key={key}>{data} {isDelete?
                                            <AiFillDelete color={"red"} onClick={()=>{
                                                deleteDB(userClass._id,data)
                                            }} className="deleteButton"/>
                                        :null}</td>
                                    )
                                }) 
                            }
                        
                        </tr>
                        <tr>
                            <td>3年級</td>
                            {
                                userClass[Subject].map((data,key)=>{
                                    let arr = classSplit(data);
                                    if(arr[0]!=3) return;
                                    return (
                                        <td key={key}>{data} {isDelete?
                                            <AiFillDelete color={"red"} onClick={()=>{
                                                deleteDB(userClass._id,data)
                                            }} className="deleteButton"/>
                                        :null}</td>
                                    )
                                }) 
                            }
                        </tr>
                        <tr>
                            <td>4年級</td>
                            {
                                userClass[Subject].map((data,key)=>{
                                    let arr = classSplit(data);
                                    if(arr[0]!=4) return;
                                    return (
                                        <td key={key}>{data} {isDelete?
                                            <AiFillDelete color={"red"} onClick={()=>{
                                                deleteDB(userClass._id,data)
                                            }} className="deleteButton"/>
                                        :null}</td>
                                    )
                                }) 
                            }
                        </tr>
                        <tr>
                            <td>5年級</td>
                            {
                                userClass[Subject].map((data,key)=>{
                                    let arr = classSplit(data);
                                    if(arr[0]!=5) return;
                                    return (
                                        <td key={key}>{data} {isDelete?
                                            <AiFillDelete color={"red"} onClick={()=>{
                                                deleteDB(userClass._id,data)
                                            }} className="deleteButton"/>
                                        :null}</td>
                                    )
                                }) 
                            }
                        </tr>
                        <tr>
                            <td>6年級</td>
                            {
                                userClass[Subject].map((data,key)=>{
                                    let arr = classSplit(data);
                                    if(arr[0]!=6) return;
                                    return (
                                        <td key={key}>{data} {isDelete?
                                            <AiFillDelete color={"red"} onClick={()=>{
                                                deleteDB(userClass._id,data)
                                            }} className="deleteButton"/>
                                        :null}</td>
                                    )
                                }) 
                            }
                        </tr>
                    </tbody>
                </table>
                <table>
                <tbody>
                <tr className='showClassFooter'>
                    <motion.td 
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    className='classButton'
                    onClick={()=>{
                        navigate(`/Profile/InsertClass/${Subject}`)
                    }}><AiOutlineForm className="icon"/>新增</motion.td>
                    <motion.td 
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    className='classButton'
                    onClick={()=>{
                        navigate("/Profile")
                    }}>返回</motion.td>
                    <motion.td 
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    className='classButton'
                    onClick={()=>{
                        setIsDelete(!isDelete);
                    }}>{isDelete?"取消":"刪除"}</motion.td>
                </tr>
                </tbody>
                </table>
                
                </motion.div>
                )
                }
                {isMobile?
                (
                <table>
                    <tbody>
                        <tr className='showClassFooter'>
                            <motion.td 
                            whileHover={{scale:1.1}}
                            whileTap={{scale:0.9,borderStyle:'none'}}
                            className='classButton'
                            style={{
                                borderBottomLeftRadius: 10,
                                borderRightStyle:'solid'
                            }}
                            onClick={()=>{
                                navigate(`/Profile/InsertClass/${Subject}`)
                            }}><AiOutlineForm className="icon"/>新增</motion.td>
                            <motion.td 
                            whileHover={{scale:1.1}}
                            whileTap={{scale:0.9,borderStyle:'none'}}
                            className='classButton'
                            style={{
                                borderRightStyle:'solid',
                                borderLeftStyle:'solid'
                            }}
                            onClick={()=>{
                                navigate(`/Profile`)
                            }}>返回</motion.td>
                            <motion.td 
                            whileHover={{scale:1.1}}
                            whileTap={{scale:0.9,borderStyle:'none'}}
                            className='classButton'
                            style={{
                                borderLeftStyle:'solid',
                                borderBottomRightRadius: 10
                            }}
                            onClick={()=>{
                                setIsDelete(!isDelete);
                            }}>{isDelete?"取消":"刪除"}</motion.td>
                        </tr>
                    </tbody>
                </table>
                )
                :null
                }
                
            
        </motion.div>
    );
};
/**/