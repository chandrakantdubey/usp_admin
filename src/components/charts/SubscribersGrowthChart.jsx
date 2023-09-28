import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SubscribersGrowthChart = () => {
  const options = {
    title: {
      text: "Subscriber Growth",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: "Subscribers",
      },
    },
    credits: false,
    series: [
      {
        name: "Subscribers",
        data: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650],
        color: "#ff7f0e",
        lineWidth: 2,
        marker: {
          symbol: "circle",
          fillColor: "#ff7f0e",
          lineWidth: 2,
          lineColor: "#ffffff",
        },
      },
    ],
    plotOptions: {
      line: {
        marker: {
          enabled: true,
        },
      },
    },
    chart: {
      height: 300,
    },
  };

  return (
    <div className="morphism">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SubscribersGrowthChart;
