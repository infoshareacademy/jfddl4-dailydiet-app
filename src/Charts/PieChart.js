import React from 'react'
import {PieChart, Pie, Tooltip, Cell} from 'recharts'


const data = [
    {
        value: 30,
        name: 'Weglowodany',
        color: '#35b22a'
    },
    {
        value: 15,
        name: 'Bialka',
        color: '#352ab2'
    },
    {
        value: 25,
        name: 'Tluszcze',
        color: '#c70d33'
    }
]
const styles = {
    margin: 'auto'
}


const pie_cells = data.map((entry, index) => {
    return (<Cell key={index} fill={entry.color}/>)
});

const Chart1 = () => (
    <div style={styles} >
        <h3>Division of micronutrients</h3>
        <PieChart  width={200} height={200} style={styles}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
            >
                {pie_cells}
            </Pie>
            <Tooltip/>
        </PieChart>
    </div>
)

export default Chart1


