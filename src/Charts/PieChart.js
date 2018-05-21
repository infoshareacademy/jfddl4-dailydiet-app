import React from 'react'
import {PieChart, Pie, Tooltip, Cell} from 'recharts'
import {connect} from 'react-redux'

const data = [
    {
        value: 30,
        name: 'Carbohydrates',
        color: '#35b22a'
    },
    {
        value: 15,
        name: 'Proteins',
        color: '#352ab2'
    },
    {
        value: 25,
        name: 'Fat',
        color: '#c70d33'
    }
]
const styles = {
    margin: 'auto'
}



const pie_cells = data.map((entry, index) => {
    return (<Cell key={index} fill={entry.color}/>)
});

const Chart1 = (props) => {
    // const numberOfVegetables = Object.keys(props.products.other).reduce(function (reduced, key) {
    //     return reduced + props.products.other
    // }, 0)

    return (
        <div style={styles}>
            {console.log(numberOfVegetables)}
            <h3>Division of macronutrients</h3>
            <PieChart width={300} height={300} style={styles}>
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
}

export default connect(
    state => ({
        products: state.products
    })
)(Chart1)


