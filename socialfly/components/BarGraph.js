import React from "react";

import { Bar } from "react-chartjs-2";

function BarGraph(props) {
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
    <div className="bg-white max-w-[300px] h-fit">
      <Bar
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
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    suggestedMin: 0,
                    behinAtZero: true,
                  },
                },
              ],
            },
          },
        }}
      />
    </div>
  );
}

export default BarGraph;
