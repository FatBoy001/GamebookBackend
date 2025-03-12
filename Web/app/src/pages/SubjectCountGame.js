import React from 'react';
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

export const options = {
    scales: {
        yAxes:{
            grid: {
                drawBorder: true,
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
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 1),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    
  ],
};

export const SubjectCountGame =  () =>{
  return <Bar options={options} data={data} />;
}
