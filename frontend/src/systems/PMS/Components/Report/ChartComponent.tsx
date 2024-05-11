import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface ChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const chartData: ChartData<"pie", number[], string> = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E7E9ED",
          "#4BC0C0",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} />;
};

export default ChartComponent;
