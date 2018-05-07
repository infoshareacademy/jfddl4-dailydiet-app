import React from 'react'
import {Line, XAxis, YAxis, LineChart, CartesianGrid, Tooltip, Legend} from 'recharts'

const styles = {
    margin: 'auto'
}

const data = [
    {name: '00:00-9:00', calories: 150, amt: 2400},
    {name: '9:00-12:00', calories: 450, amt: 2210},
    {name: '12:00-15:00', calories: 800, amt: 2290},
    {name: '15:00-18:00', calories: 1300, amt: 2000},
    {name: '18:00-21:00', calories: 1780, amt: 2181},
    {name: '21:00-24:00', calories: 2080, amt: 2500},
]

const Chart2 = () => (
    <div>
        <h3>Calories consumed today</h3>
        <LineChart width={500} height={250} data={data}  style={styles}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#82ca9d" />
        </LineChart>
    </div>
)

export default Chart2