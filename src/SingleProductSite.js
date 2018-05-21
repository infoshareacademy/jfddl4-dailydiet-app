import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const fontSizes = {
    fontSize: '24px',
}
const upper = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

class SingleProductSite extends React.Component {
    state = {
        product: null,
        productKey: ''
    }

    componentDidMount() {

        const productKey = this.props.match.params.product

        this.setState({productKey})

        fetch(`https://dailydiet-app.firebaseio.com/products/${productKey}/.json`)
            .then((response) => response.json())
            .then(dataProduct => {
                this.setState({
                    product: dataProduct,
                    data: [
                        {name: 'fat', dailyNorm: 56, product: dataProduct.fat, amt: 2400},
                        {name: 'protein', dailyNorm: 63, product: dataProduct.protein, amt: 2290},
                        {name: 'carbohydrates', dailyNorm: 282, product: dataProduct.carbohydrates, amt: 2000},

                    ]
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.product ?
                        <div>
                            <h1 style={{textAlign: 'center', color: '#E65100'}}>
                                {upper(this.state.product.name)}
                            </h1>
                            <Grid fluid>
                                <Row center="xs" middle="xs">
                                    <Col xs={12} md={6}>
                                        <Table>
                                            <TableBody displayRowCheckbox={false}>
                                                <TableRow>
                                                    <TableRowColumn style={fontSizes}>category:</TableRowColumn>
                                                    <TableRowColumn
                                                        style={fontSizes}>{this.state.product.category}</TableRowColumn>
                                                </TableRow>
                                                <TableRow>
                                                    <TableRowColumn style={fontSizes}>kcal: </TableRowColumn>
                                                    <TableRowColumn
                                                        style={fontSizes}>{this.state.product.kcal}</TableRowColumn>
                                                </TableRow>
                                                <TableRow>
                                                    <TableRowColumn style={fontSizes}>fat:</TableRowColumn>
                                                    <TableRowColumn
                                                        style={fontSizes}>{this.state.product.fat}</TableRowColumn>
                                                </TableRow>
                                                <TableRow>
                                                    <TableRowColumn style={fontSizes}>carbohydrates:</TableRowColumn>
                                                    <TableRowColumn
                                                        style={fontSizes}>{this.state.product.carbohydrates}</TableRowColumn>
                                                </TableRow>
                                                <TableRow>
                                                    <TableRowColumn style={fontSizes}>protein:</TableRowColumn>
                                                    <TableRowColumn
                                                        style={fontSizes}>{this.state.product.protein}</TableRowColumn>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <img src={this.state.product.picture} alt={this.state.product.name}
                                             width={'250vw'}/>
                                    </Col>
                                </Row>
                                <Row center="xs" middle="xs">
                                    <Col xs={12} md={6}>
                                        <BarChart width={600} height={300} data={this.state.data}>
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
                                            onClick={this.onFavoriteRequest}
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
}

export default SingleProductSite