import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "pie",
    height: 300,
  },
  title: {
    text: "Top Subscribed Products",
  },
  credits: false,
  series: [
    {
      name: "Users",
      data: [
        ["Google Cloud", 25],
        ["AWS", 50],
        ["Azure", 15],
      ],
    },
  ],
};

const TopProductsChart = () => {
  return (
    <div className="morphism">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TopProductsChart;
