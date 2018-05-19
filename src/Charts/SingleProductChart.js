import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {connect} from 'react-redux'

const SingleProductChart = (props) => {
    const productKey = props.chartProduct
    const product = props.products.find(
        product => product.key === productKey
    )
    const data = product && [
        {name: 'fat', dailyNorm: 56, product: product.fat, amt: 2400},
        {name: 'protein', dailyNorm: 63, product: product.protein, amt: 2290},
        {name: 'carbohydrates', dailyNorm: 282, product: product.carbohydrates, amt: 2000},

    ]
    return (
        <div>

            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="product" fill="#FBC02D"/>
                <Bar dataKey="dailyNorm" fill="#EF6C00"/>
            </BarChart>

        </div>
    )
}


export default connect(
    state => ({
        products: state.products
    })
)(SingleProductChart)