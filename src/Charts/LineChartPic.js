import React from 'react'
import {Line, XAxis, YAxis, LineChart, CartesianGrid, Tooltip, Legend} from 'recharts'
import {connect} from 'react-redux'


const styles = {
    margin: 'auto'
}



const LineChartPic = (props) => {
    return (
            <div>
                <h3>Logs this week</h3>
                <LineChart
                    width={props.widthOfLineChart}
                    height={props.heightOfLineChart}
                    data={props.arrayOfTimestamps} style={styles}
                    margin={{top: 30, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="day"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="logs" stroke="#82ca9d"/>
                </LineChart>
            </div>
        )
    }


export default connect(
    state => ({
        loginsNumber: state.loginsLogs.loginsNumber,
        arrayOfTimestamps: state.loginsLogs.arrayOfTimestamps
    })
)(LineChartPic)