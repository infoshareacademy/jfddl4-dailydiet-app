import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {connect} from 'react-redux'
import {upper} from '../utils'
import {addProductToMeal, addDate} from '../state/addProductsToMeals'
import SingleProductChart from '../Charts/SingleProductChart'
import SingleProductTable from '../Tables/SingleProductTable'
import DialogFavorites from '../favorites/DialogFavorites'
import AddProductToMeal from './AddProductToMeal'
import RaisedButton from 'material-ui/RaisedButton'
import {favoriteRequest} from "../state/favorites";


const SingleProductSite = (props) => {
    const productKey = props.match.params.product
    const product = props.products.find(
        product => product.key === productKey
    )

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
                                         width={'200vw'}/>
                                </Col>
                            </Row>
                            <Row center="xs" middle="xs">
                                <Col xs={12} md={6}>
                                    <SingleProductChart
                                        chartProduct={product.key}/>
                                </Col>
                                <Col xs={12} md={6} center="xs">
                                    <Row center="xs" middle="xs" style={{margin: '15px'}}>
                                        <AddProductToMeal
                                            product={product.key}/>
                                    </Row>
                                    <Row center="xs" middle="xs" style={{margin: '15px'}}>
                                        <RaisedButton
                                            name={'addAProductToFavorites'}
                                            backgroundColor={'#E65100'}
                                            label={<span style={{color: 'white'}}>
                                                {
                                                    props.favoritesKeys.filter(key => key === product.key).length ?
                                                        "Remove from favorites"
                                                        :
                                                        "Add to favorites"
                                                }
                                                </span>}
                                            onClick={() => props.favoriteRequest(product.key, product.name)
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <DialogFavorites/>
                        </Grid>
                    </div>
                    :
                    "Loading..."
            }
        </div>
    )
}


const mapStateToProps = state => ({
    requestedKey: state.favorites.requestedKey,
    favoritesKeys: state.favorites.keys,
    products: state.products
})

const mapDispatchToProps = dispatch => ({
    addProductToMeal: (myProduct) => dispatch(addProductToMeal(myProduct)),
    favoriteRequest: (key, name) => dispatch(favoriteRequest(key, name)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleProductSite)