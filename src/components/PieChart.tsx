// PieChart.tsx
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

interface PieChartProps {
  balances: { [key: string]: number };  // This is the prop we're expecting
}

const PieChart: React.FC<PieChartProps> = ({ balances }) => {
  const [chartData, setChartData] = useState<{
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor: string[],
      hoverOffset: number
    }[]
  }>({
    labels: [],
    datasets: [{
      label: 'Asset Distribution',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
      ],
      hoverOffset: 4
    }]
  });

  useEffect(() => {
    const labels = Object.keys(balances); // Using balances to extract labels
    const values = Object.values(balances); // Using balances to extract values

    setChartData({
      labels: labels,
      datasets: [{
        ...chartData.datasets[0],
        data: values,
      }]
    });
  }, [balances]);

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut
        data={chartData}
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
