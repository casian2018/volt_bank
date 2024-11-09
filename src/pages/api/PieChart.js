import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = () => {
    const [chartData, setChartData] = useState({
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
        const fetchData = async () => {
            try {
                const response = await fetch('/api/forex-balances');
                const data = await response.json();

                // Assuming the response data is an object with keys as symbols and values as balances
                const labels = Object.keys(data); // Extracting labels (symbols)
                const values = Object.values(data); // Extracting values (balances)

                setChartData({
                    labels: labels,
                    datasets: [{
                        ...chartData.datasets[0],
                        data: values,
                    }]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty array to run only once when the component mounts

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
