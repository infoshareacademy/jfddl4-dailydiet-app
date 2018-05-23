import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {connect} from 'react-redux'
import {upper} from '../utils'
import {addProductToMeal, addDate} from '../state/addProductsToMeals'
import SingleProductChart from '../Charts/SingleProductChart'
import SingleProductTable from '../Tables/SingleProductTable'
import AddProductToMeal from './AddProductToMeal'



const fontSizes = {
    fontSize: '24px',
}

const SingleProductSite = (props) => {
    const productKey = props.match.params.product
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
            {
                product ?
                    <div>
                        <h1 style={{textAlign: 'center', color: '#E65100'}}>
                            {upper(product.name)}
                        </h1>
                        <Grid fluid>
                            <Row center="xs" middle="xs">
                                <Col xs={12} md={6}>
                                    <SingleProductTable
                                        tableProduct={product.key}/>
                                </Col>
                                <Col xs={12} md={6}>
                                    <img src={product.picture} alt={product.name}
                                         width={'250vw'}/>
                                </Col>
                            </Row>
                            <Row center="xs" middle="xs">
                                <Col xs={12} md={6}>
                                    <SingleProductChart
                                        chartProduct={product.key}/>
                                </Col>
                                <Col xs={12} md={6} center="xs">
                                    <AddProductToMeal
                                    product={product.key}/>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                    :
                    "Loading..."
            }
        </div>
    )
}


const mapStateToProps = state => ({
    products: state.products
})

const mapDispatchToProps = dispatch => ({
    addProductToMeal: (myProduct) => dispatch(addProductToMeal(myProduct)),
    addDate: (dateValue) => dispatch(addDate(dateValue))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleProductSite)