import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SubscriptionTrendsChart = () => {
  const options = {
    chart: {
      type: "column",
      height: 300,
    },
    title: {
      text: "Subscription Trends",
    },
    xAxis: {
      categories: [
        "New Subscriptions",
        "Upgrades",
        "Downgrades",
        "Cancellations",
      ],
    },
    credits: false,
    yAxis: {
      title: {
        text: "Number of Subscriptions",
      },
    },
    legend: {
      align: "right",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "12px",
      },
    },
    series: [
      {
        name: "Current Month",
        data: [200, 150, 100, 50],
        color: "#7cb5ec",
      },
      {
        name: "Previous Month",
        data: [180, 160, 90, 60],
        color: "#f7a35c",
      },
    ],
  };

  return (
    <div className="morphism">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SubscriptionTrendsChart;
