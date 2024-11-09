'use client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';


const PieChart = () => {
    const data = {
        labels: [
          'symbol 1',
          'symbol 2',
          'symbol 3',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4
        }]
      };
      
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut 
        data={data}
        options={{
          plugins: {
            legend: {
              display: true,
            }
          },
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}

export default PieChart;