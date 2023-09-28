import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MeteredNonMeteredProductsChart = () => {

  const chartOptions = {
    chart: {
      type: 'pie',
      height: 300
    },
    title: {
      text: 'Metered vs Non-Metered Products'
    },
    credits:false,
    series: [{
      name: 'Products',
      data: [
        { name: 'Metered', y: 70 },
        { name: 'Non-Metered', y: 30 }
      ]
    }]
  };

  return (
    <div className='morphism'>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MeteredNonMeteredProductsChart;