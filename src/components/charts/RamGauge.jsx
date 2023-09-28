import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighChartsGauge from "highcharts/modules/solid-gauge";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);
HighChartsGauge(Highcharts);

const RamGauge = ({ availableRam, totalRam }) => {
  const options = {
    chart: {
      type: "solidgauge",
      height: 300,
    },
    title: {
      text: "RAM Usage",
    },
    credits: false,
    pane: {
      center: ["50%", "85%"],
      size: "140%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    yAxis: {
      min: 0,
      max: Number(totalRam),
      minorTickInterval: null,
      lineWidth: 0,
      tickWidth: 0,
      tickAmount: 2,

      title: {
        text: "Value",
      },
      stops: [
        [0.1, "#55BF3B"], // green
        [0.5, "#DDDF0D"], // yellow
        [0.9, "#DF5353"], // red
      ],
      labels: {
        y: 16,
      },
    },
    series: [
      {
        name: "RAM used",
        data: [parseFloat((totalRam - availableRam).toFixed(2))],
        tooltip: {
          valueSuffix: " GB",
        },
      },
    ],
  };
  return (
    <>
      <div className="morphism">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default RamGauge;
