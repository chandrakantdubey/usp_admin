import { useState } from "react";
import { AreaChart } from "@carbon/charts-react";

const data = [
  {
    group: "Bank Payment",
    date: new Date(2019, 0, 1),
    value: 0,
  },
  {
    group: "Bank Payment",
    date: new Date(2019, 0, 6),
    value: -37312,
  },
  {
    group: "Bank Payment",
    date: new Date(2019, 0, 8),
    value: -22392,
  },
  {
    group: "Bank Payment",
    date: new Date(2019, 0, 15),
    value: -52576,
  },
  {
    group: "Bank Payment",
    date: new Date(2019, 0, 19),
    value: 20135,
  },
  {
    group: "Card",
    date: new Date(2019, 0, 1),
    value: 47263,
  },
  {
    group: "Card",
    date: new Date(2019, 0, 5),
    value: 14178,
  },
  {
    group: "Card",
    date: new Date(2019, 0, 8),
    value: 23094,
  },
  {
    group: "Card",
    date: new Date(2019, 0, 13),
    value: 45281,
  },
  {
    group: "Card",
    date: new Date(2019, 0, 19),
    value: -63954,
  },
];

const options = {
  title: "Payment Methods",
  axes: {
    bottom: {
      title: "Payment Methods",
      mapsTo: "date",
      scaleType: "time",
    },
    left: {
      mapsTo: "value",
      scaleType: "linear",
    },
  },
  curve: "curveNatural",
  height: "300px",
};
const PaymentMethods = () => {
  const [chartData] = useState(data);
  const [chartOptions] = useState(options);

  return (
    <div className="morphism">
      <AreaChart data={chartData} options={chartOptions} />
    </div>
  );
};
export default PaymentMethods;
