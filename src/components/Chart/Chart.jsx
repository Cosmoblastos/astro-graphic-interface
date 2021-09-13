import React, { useState, useEffect } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)"
    }
  ]
};

const _backgroundColor = "rgb(255, 99, 132)";
const _borderColor = "rgba(255, 99, 132, 0.2)";
const _fill = false;

const _options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const Chart = ({
  title = "",
  label = "incoming data",
  options = _options,
  backgroundColor = _backgroundColor,
  borderColor = _borderColor,
  fill = _fill,
  num = 10,
  initValue = 1,
  data = []
}) => {
  const [labels, setLabels] = useState(
    [...Array(num * 100).keys()].map(i => String(i + initValue))
  );

  return (
    <>
      {title && title !== "" && (
        <div className="header">
          <h2 className="title">{title}</h2>
        </div>
      )}
      <Line
        data={{
          labels,
          datasets: [{ label, data, fill, backgroundColor, borderColor }]
        }}
        options={options}
      />
    </>
  );
};

export default Chart;
