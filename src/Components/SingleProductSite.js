import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {connect} from 'react-redux'
import {upper} from '../utils'

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
                                    <Table>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn style={fontSizes}>category:</TableRowColumn>
                                                <TableRowColumn
                                                    style={fontSizes}>{product.category}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn style={fontSizes}>kcal: </TableRowColumn>
                                                <TableRowColumn
                                                    style={fontSizes}>{product.kcal}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn style={fontSizes}>fat:</TableRowColumn>
                                                <TableRowColumn
                                                    style={fontSizes}>{product.fat}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn style={fontSizes}>carbohydrates:</TableRowColumn>
                                                <TableRowColumn
                                                    style={fontSizes}>{product.carbohydrates}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn style={fontSizes}>protein:</TableRowColumn>
                                                <TableRowColumn
                                                    style={fontSizes}>{product.protein}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Col>
                                <Col xs={12} md={6}>
                                    <img src={product.picture} alt={product.name}
                                         width={'250vw'}/>
                                </Col>
                            </Row>
                            <Row center="xs" middle="xs">
                                <Col xs={12} md={6}>
                                    <BarChart width={600} height={300} data={data}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="product" fill="#FBC02D"/>
                                        <Bar dataKey="dailyNorm" fill="#EF6C00"/>
                                    </BarChart>
                                </Col>
                                <Col xs={12} md={6} center="xs">
                                    <RaisedButton
                                        name={'addAProductToFavorites'}
                                        backgroundColor={'#E65100'}
                                        label={<span style={{color: 'white'}}>Add to favorites</span>}
                                        // onClick={() => onFavoriteRequest()}
                                    />
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


export default connect(
    state => ({
        products: state.products
    })
)(SingleProductSite)