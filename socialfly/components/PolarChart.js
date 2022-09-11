import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function Polar(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "# of Votes",
        data: props.data,
        backgroundColor: props.backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white">
      <PolarArea data={data} />
    </div>
  );
}

export default Polar;
