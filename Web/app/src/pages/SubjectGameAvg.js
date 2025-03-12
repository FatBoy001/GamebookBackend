import React from 'react';
import { useEffect,useState,useContext } from "react";
import {ConnectConfig} from '../App.js';
import Axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [0, 10, 20, 30, 40, 50, 60,70,80,90,100];

export const SubjectGameAvg=(props)=>{
  const [game,setGame] = useState([]);
  const [student,setStudent] = useState([]);
  
  let subjectTranslate = (subject)=>{
    switch(subject){
      case "Math":
        return "數學";
      case "English":
        return "英文";
      case "Science":
        return "自然";
      case "Social":
        return "社會";
      case "Chinese":
        return "國文";
      default:
        return;
    }
  }
  const {IpAddress}=useContext(ConnectConfig);
  useEffect(()=>{
    let req = {
      game:props.chooseGame,
      type:props.chooseSubject,
      Class:props.chooseClass
    }
    /* Axios.post(`https://localhost:8800/nodeAPI/getGames`,req).then((response)=>{
      setGame(response.data);
    });
    Axios.get(`https://localhost:8800/nodeAPI/getStudents`).then((response)=>{
      setStudent(response.data);
    }); */
    Axios.post(`https://${IpAddress}/getGames`,req).then((response)=>{
      setGame(response.data);
    });
    Axios.get(`https://${IpAddress}/getStudents`).then((response)=>{
      setStudent(response.data);
    });
  },[props]);
  if(!game[0]) return;
  if(!student[0]) return;

  //篩選學生是否為選擇班級
  const classStudent =student.filter((element)=>{
    if(element.Class===props.chooseClass)
      return element;
  })
  const studentScore = [];

  classStudent.forEach((data)=>{
    let studentAvg =0;
    let studentSum = 0;
    let dataCount = 0;

    game.forEach((element)=>{
      if(data._id != element.student_oid) return;
      studentSum = studentSum+element.score;
      
      dataCount++;
    })
    studentAvg = studentSum/dataCount;
    studentScore.push(studentAvg);
  })
  
  let Count0=0;
  let Count10=0;
  let Count20=0;
  let Count30=0;
  let Count40=0;
  let Count50=0;
  let Count60=0;
  let Count70=0;
  let Count80=0;
  let Count90=0;
  let Count100=0;
  for(let i=0;i<studentScore.length;i++){
    switch(Math.floor(studentScore[i]/10)){
      case 0:
        Count0++;
        break;
      case 1:
        Count10++;
        break;
      case 2:
        Count20++;
        break;
      case 3:
        Count30++;
        break;
      case 4:
        Count40++;
        break;
      case 5:
        Count50++;
        break;
      case 6:
        Count60++;
        break;
      case 7:
        Count70++;
        break;
      case 8:
        Count80++;
        break;
      case 9:
        Count90++;
        break;
      case 10:
        Count100++;
        break;
      default:
        break;
    }
  }
  const scoreDistribute =[
    Count0,
    Count10,
    Count20,
    Count30,
    Count40,
    Count50,
    Count60,
    Count70,
    Count80,
    Count90,
    Count100,
  ];
  const data = {
    labels,
    datasets: [
      {
        label: '人數',
        data: scoreDistribute,
        backgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ],
  };
  /*設定*/
  
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${props.chooseClass} (${subjectTranslate(props.chooseSubject)}-${props.chooseGame})`,
        color:'#FFFFFF'
      },
    },
    scales: {
      yAxes:{
          grid: {
              drawBorder: true,
              color: '#FFFFFF',
          },
          ticks:{
              beginAtZero: true,
              color: 'white',
              fontSize: 12,
              stepSize: 1,
          }
      },
      xAxes: {
          grid: {
              drawBorder: true,
              color: '#FFFFFF',
          },
          ticks:{
              beginAtZero: true,
              color: 'white',
              fontSize: 12,
          }
      },
    }
  };
  
  return <Bar
  options={options}
  data={data}
  height="300px"
  width="200px"/>

}
