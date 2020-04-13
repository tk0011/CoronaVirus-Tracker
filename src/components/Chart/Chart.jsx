import React, {useState , useEffect} from 'react';
import {fetchDailyData} from '../../api';
import { Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data : {confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
      dailyData.length
       ? ( 
       <Line 
        data = {{
            labels : dailyData.map(({date}) => date),
            datasets : [{
                data: dailyData.map(({confirmed}) => confirmed),
                label : 'Infected',
            
                borderColor : 'rgb(13, 188, 194)',
                fill: true,
            },{
                data: dailyData.map(({deaths}) => deaths),
                label : 'Deaths',
                borderColor : 'black',
                backgroundColor : 'rgb(136, 21, 8)',
                fill: true,
            }],
        }}
    /> ) : null
    );

    const barChart = (
        confirmed 
        ? (
            <Bar
                data = {{
                        labels : ['INFECTED' , 'RECOVERED' , 'DEATHS'] , 
                        datasets : [{
                            label : 'People' ,
                            backgroundColor : ['rgb(13, 188, 194)' , 'rgba(0, 117, 35, 0.842)' , 'rgb(136, 21, 8)'],
                            data: [confirmed.value , recovered.value , deaths.value]
                        }]
                    }}

                options = {{
                    legend: {display: false},
                    title : {display : true, text : `Current Situation in ${country}`}
                }}
            />

        ) : null
    );

    return (
       <div className = {styles.container}>
        {country ? barChart : lineChart}
       </div>
    )
}

export default Chart