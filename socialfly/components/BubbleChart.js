import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function BubbleChart(props) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        label: "Engagement",
      },
    },
  };

  console.log("bubble data", props.data);
  return (
    <div className="min-w-[500px] bg-white">
      <Bubble options={options} data={props.data} />
    </div>
  );
}
