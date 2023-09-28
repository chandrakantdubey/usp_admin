import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AddonsUtilisationChart = () => {
    const options = {
        chart: {
            type: 'bar',
            height: 300
        },
        title: {
            text: 'Addon Utilization'
        },
        xAxis: {
            categories: ['Addon 1', 'Addon 2', 'Addon 3', 'Addon 4', 'Addon 5']
        },
        credits: false,
        yAxis: {
            title: {
                text: 'Utilization'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'High Utilization',
            data: [70, 50, 80, 60, 90],
            color: '#7cb5ec'
        }, {
            name: 'Medium Utilization',
            data: [40, 60, 30, 50, 20],
            color: '#434348'
        }, {
            name: 'Low Utilization',
            data: [10, 30, 20, 10, 40],
            color: '#90ed7d'
        }],
    };

    return (
        <div className='morphism'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default AddonsUtilisationChart;