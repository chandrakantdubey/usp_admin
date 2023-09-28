import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const UserActivityChart = ({ activeUsers }) => {
  const options = {
    chart: {
      zoomType: "xy",
      height: 300,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "User activity",
    },
    subtitle: {
      text: "No. of user active at a particular time",
    },
    xAxis: {
      categories: activeUsers.activityTable.dates,
    },
    yAxis: {
      tickInterval: 1,
      title: {
        text: "Number of Users",
      },
    },
    series: [
      {
        name: "Online Users",
        data: activeUsers.activityTable.userCounts,
      },
    ],
  };
  return (
    <div className="morphism">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default UserActivityChart;
