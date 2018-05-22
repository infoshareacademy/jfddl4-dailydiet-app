import React from 'react'
import {PieChart, Pie, Tooltip, Cell} from 'recharts'
import {connect} from 'react-redux'

const Chart1 = (props) => {

    const numberOfOther = props.products.filter(
        product => product.category === 'other'
    )
    const numberOfVegetables = props.products.filter(
        product => product.category === 'vegetables'
    )
    const numberOfFruit = props.products.filter(
        product => product.category === 'fruit'
    )
    const numberOfSweets = props.products.filter(
        product => product.category === 'sweets'
    )
    const numberOfDrinks = props.products.filter(
        product => product.category === 'drinks'
    )
    const numberOfDairy = props.products.filter(
        product => product.category === 'dairy'
    )
    const numberOfMeat = props.products.filter(
        product => product.category === 'meat'
    )


    const data = [
        {
            value: numberOfMeat.length,
            name: 'Meat',
            color: '#FFC107'
        },
        {
            value: numberOfDairy.length,
            name: 'Dairy',
            color: '#FFEB3B'
        },
        {
            value: numberOfDrinks.length,
            name: 'Drinks',
            color: '#D4E157'
        },
        {
            value: numberOfSweets.length,
            name: 'Sweets',
            color: '#8BC34A'
        },
        {
            value: numberOfFruit.length,
            name: 'Fruit',
            color: '#4CAF50'
        },
        {
            value: numberOfVegetables.length,
            name: 'Vegetables',
            color: '#3F51B5'
        },
        {
            value: numberOfOther.length,
            name: 'Other',
            color: '#009688'
        }
    ]
    const styles = {
        margin: 'auto'
    }


    const pie_cells = data.map((entry, index) => {
        return (<Cell key={index} fill={entry.color}/>)
    });

    return (
        <div style={styles}>
            <h3>Number of products in database</h3>
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


