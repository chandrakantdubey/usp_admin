import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CustomerSupportMetricsChart = () => {
  const options = {
    chart: {
      type: "column",
      height: 300,
    },
    title: {
      text: "Customer Support Metrics",
    },
    xAxis: {
      categories: [
        "Response Time",
        "Ticket Resolution Rate",
        "User Satisfaction",
      ],
    },
    credits: false,
    yAxis: {
      title: {
        text: "Percentage",
      },
    },
    series: [
      {
        name: "Current Month",
        data: [80, 90, 85],
        color: "#7cb5ec",
      },
      {
        name: "Previous Month",
        data: [75, 85, 80],
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

export default CustomerSupportMetricsChart;
