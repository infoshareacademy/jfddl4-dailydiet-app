import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {connect} from 'react-redux'

class SingleProductChart extends React.Component {
    state = {

    }

    componentDidMount() {
        const productKey = this.props.chartProduct
        const product = this.props.products.find(
            product => product.key === productKey
        )
        const data = product && [
            {name: 'fat', dailyNorm: 56, product: product.fat, amt: 2400},
            {name: 'protein', dailyNorm: 63, product: product.protein, amt: 2290},
            {name: 'carbohydrates', dailyNorm: 282, product: product.carbohydrates, amt: 2000},

        ]
        this.setState({data})
    }


    render() {
        const onResizeWidthOfLineChart = () => {
            if (window.innerWidth > 768) {
                return 600
            }
            else if (window.innerWidth > 450) {
                return 400
            }
            else {
                return 300
            }
        }
        const onResizeHeightOfLineChart = () => {
            if (window.innerWidth > 768) {
                return 300
            }
            else if (window.innerWidth > 450) {
                return 200
            }
            else {
                return 200
            }
        }
        return (
            <div>
                {this.state.data ?
                <BarChart width={onResizeWidthOfLineChart()} height={onResizeHeightOfLineChart()} data={this.state.data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="product" fill="#FBC02D"/>
                    <Bar dataKey="dailyNorm" fill="#EF6C00"/>
                </BarChart>
                    :
                    'loading'
                }
            </div>
        )
    }

}

export default connect(
    state => ({
        products: state.products
    })
)(SingleProductChart)