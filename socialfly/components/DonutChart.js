import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

function TestChart(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "SocialFly",
        data: props.data,
        backgroundColor: props.backgroundColors,
        borderColor: props.borderColor,
        hoverOffset: 1,
      },
    ],
  };

  return (
    <div className="bg-white max-w-[300px] h-fill flex flex-col justify-center items-center">
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: props.title,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}

export default TestChart;
