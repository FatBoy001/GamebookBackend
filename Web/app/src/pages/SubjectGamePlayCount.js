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
 

export const SubjectGamePlayCount = (props)=>{
    const {IpAddress}=useContext(ConnectConfig);
    const [game,setGame] = useState([]);
    const [student,setStudent] = useState([]);
    useEffect(()=>{
        let req = {
          game:props.chooseGame,
          type:props.chooseSubject,
          Class:props.chooseClass,
          startTime:new Date(props.chooseStartTime),
          endTime:new Date(props.chooseEndTime)
        }
        /* Axios.post(`https://localhost:8800/nodeAPI/getGameInRange`,req).then((response)=>{
          setGame(response.data);
        });
        Axios.post(`https://localhost:8800/nodeAPI/getClassStudent`,req).then((response)=>{
          setStudent(response.data);
        }); */
        Axios.post(`https://${IpAddress}/getGameInRange`,req).then((response)=>{
          setGame(response.data);
        });
        Axios.post(`https://${IpAddress}/getClassStudent`,req).then((response)=>{
          setStudent(response.data);
        });
    },[props]);
    const gameCounts = [];
    student.forEach((data)=>{
        let dataCount = 0;
        game.forEach((element)=>{
          if(data._id != element.student_oid) return;     
          dataCount++;
        })
        gameCounts.push(dataCount);
      })

    const labels = student.map((element)=>{
        return element.userName;
    });
    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: `${props.chooseGame}學生時間內遊玩的次數`,
            color: "white"
          },
        },scales: {
            yAxes:{
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
            xAxes: {
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
          },
      };
    const data = {
        labels,
        datasets: [
          {
            label: '遊玩次數',
            data: gameCounts,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ],
    };    

    return <Bar options={options} data={data} />;
}
