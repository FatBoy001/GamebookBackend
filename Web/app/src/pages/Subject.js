import './Subject.css';
import {motion,useAnimationControls, useDeprecatedAnimatedState} from "framer-motion";
import { useState,useContext,useEffect } from 'react';
import {UserInfo} from '../App.js';
import cookie from "js-cookie";
import { SubjectChart } from './SubjectChart';
import { SubjectGameAvg } from './SubjectGameAvg';
import { SubjectCountGame } from './SubjectCountGame';
import { SubjectGamePlayCount } from './SubjectGamePlayCount';
export const Subject=()=>{
    const [chooseSubject,setChooseSubject] = useState("");
    const [chooseClass,setChooseClass] = useState("");
    const [chooseGame,setChooseGame] = useState("");
    const [startTime,setStartTime] = useState("");
    const [endTime,setEndTime] = useState("");
    const [dateIsSend,setDateIsSend] = useState(false);
    
    const subjectControls = useAnimationControls();
    const classControls = useAnimationControls();
    const gameControls = useAnimationControls();
    const chartControls = useAnimationControls();
    const gameAvgChartControls = useAnimationControls();
    const gameCountChartControls = useAnimationControls();
    const sequence = async()=>{
        subjectControls.set({ opacity: 0 });
        classControls.set({ opacity: 0 });
        gameControls.set({ opacity: 0 });
        chartControls.set({ opacity: 0 });
        gameAvgChartControls.set({ opacity: 0 });
        gameCountChartControls.set({ opacity: 0 });
        await subjectControls.start({y:[500,-25,25,0],opacity:1});
        await classControls.start({y:[200,-25,25,0],opacity:1});
        await gameControls.start({y:[200,-25,25,0],opacity:1});
        await chartControls.start({y:[200,-25,25,0],opacity:1}); 
        await gameAvgChartControls.start({y:[200,-25,25,0],opacity:1});
        await gameCountChartControls.start({y:[200,-25,25,0],opacity:1});
        
    }
    useEffect(()=>{
        sequence();
    },[])
    /* 取得課程資料 */
    const {listOfTeachers,listOfClass}=useContext(UserInfo);
    if(!cookie.get('userLogin')) return;
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

    const subject = {
        math:["mathDungeon","HelloWorld"],
        chinese:["scEnd"],
        english:["ABC"],
        science:[],
        social:[],

    };
    /*-----------*/
    return (
        <div className="layoutContainer">
            <motion.div
            exit={{y:[0,1000],opacity:0}}
            animate={subjectControls}
            transition={{duration:1}}
            className="classContainer">
                        <motion.div
                        className="buttonClass"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={()=>{
                            setChooseClass("");
                            setChooseGame("");
                            setChooseSubject("Chinese");
                        }}
                        >國文</motion.div>

                        <motion.div
                        className="buttonClass"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={()=>{
                            setChooseClass("");
                            setChooseGame("");
                            setChooseSubject("English");
                        }}
                        >英文</motion.div>

                        <motion.div
                        className="buttonClass"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={()=>{
                            setChooseClass("");
                            setChooseGame("");
                            setChooseSubject("Math");
                        }}
                        >數學</motion.div>

                        <motion.div
                        className="buttonClass"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={()=>{
                            setChooseClass("");
                            setChooseGame("");
                            setChooseSubject("Science");
                        }}
                        >自然</motion.div>

                        <motion.div
                        className="buttonClass"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={()=>{
                            setChooseClass("");
                            setChooseGame("");
                            setChooseSubject("Social");
                        }}
                        >社會</motion.div>
            </motion.div>
            <motion.div
            exit={{y:[0,1000],opacity:0}}
            animate={classControls}
            className="classContainer">
                {
                chooseSubject===""?
                <div className="buttonClass">請選擇科目</div>
                :
                (userClass[chooseSubject].length===0?(
                    <motion.div
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        className="buttonClass">
                        沒有資料
                    </motion.div>
                ):(
                    userClass[chooseSubject].map((data,key)=>{
                        return(
                            <motion.div
                            whileHover={{scale:1.1}}
                            whileTap={{scale:0.9}}
                            key={key}
                            className="buttonClass"
                            onClick={()=>{
                                setChooseClass(data);
                            }}>
                                {data}
                            </motion.div>
                        )      
                    })
                ))
                
                } 
            </motion.div>
            <motion.div
            exit={{y:[0,1000],opacity:0}}
            animate ={gameControls}
            className="classContainer">
                {
                chooseSubject===""?
                <div className="buttonClass">請選擇科目</div>
                :
                (userClass[chooseSubject].length===0?(
                    <motion.div
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        className="buttonClass">
                        沒有資料
                    </motion.div>
                ):(
                    
                    subject[chooseSubject.toLowerCase()].map((data,key)=>{
                        console.log(data)
                        return(
                            <motion.div
                            whileHover={{scale:1.1}}
                            whileTap={{scale:0.9}}
                            key={key}
                            className="buttonClass"
                            onClick={()=>{
                                setChooseGame(data);
                            }}>
                                {data}
                            </motion.div>
                        )      
                    })

                ))
                }  
            </motion.div>
            <motion.div
            className="timeContainer">
                起始時間:
                <input type="datetime-local" name="start" min="2018-01-01" onChange={(event)=>{setStartTime(event.target.value)}}/>
                結束時間:
                <input type="datetime-local" name="end" min="2018-01-01" onChange={(event)=>{setEndTime(event.target.value)}}/>
                <motion.div
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                style={{color:"black"}}
                className="buttonClass"
                onClick={()=>{
                    setDateIsSend(true);
                }}>確定</motion.div>
            </motion.div>
            <motion.div
            exit={{y:[0,1000],opacity:0}}
            animate={chartControls}
            className="displayContainer">
                {chooseClass!==""&&chooseSubject!==""?
                <SubjectChart
                className="chart"
                chooseClass={chooseClass}
                chooseSubject={chooseSubject}/>:null }
            </motion.div>
            <motion.div
            exit={{y:[0,1000],opacity:0}}
            animate={gameAvgChartControls}
            className="homeworkContainer">
                {chooseClass!==""&&chooseSubject!==""&&chooseGame!==""?
                <SubjectGameAvg
                className="chart"
                chooseClass={chooseClass}
                chooseGame={chooseGame}
                chooseSubject={chooseSubject}/>:null }
            </motion.div>
            <motion.div
            exit={{y:[0,1000],opacity:0}}
            animate={gameCountChartControls}
            className="playGameCountContainer">
                {chooseClass!==""&&chooseSubject!==""&&chooseGame!==""&&dateIsSend?
                <SubjectGamePlayCount
                className="chart"
                chooseClass={chooseClass}
                chooseGame={chooseGame}
                chooseSubject={chooseSubject}
                chooseStartTime={startTime!==""?startTime:"1980-1-1"}
                chooseEndTime={endTime!==""?endTime:Date.now()}/>:null}
            </motion.div>
        </div>
    );
};