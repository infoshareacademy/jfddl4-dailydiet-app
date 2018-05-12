import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const fontSizes = {
    fontSize: '24px',
    color: 'darkslategray'
}

const products = {
    "-LC45BiLSirlJPRLEN2r":
        {
            "carbohydrates": 15,
            "category": "other",
            "fat": 4.9,
            "kcal": 134,
            "name": "lasagne",
            "picture": "https://images.freeimages.com/images/large-previews/982/lasagne-1320600.jpg",
            "protein": 7
        }
}

const arrayFromProducts = Object.entries(products)
    .map(el => ({
        key: el[0],
        value: el[1].name,
        pic: el[1].picture,
        fat: el[1].fat,
        kcal: el[1].kcal,
        protein: el[1].protein,
        category: el[1].category,
        carbohydrates: el[1].carbohydrates

    }))
const data = [
    {name: 'fat', dailyNorm: 56, product: arrayFromProducts[0].fat, amt: 2400},
    {name: 'protein', dailyNorm: 63, product: arrayFromProducts[0].protein, amt: 2290},
    {name: 'carbohydrates', dailyNorm: 282, product: arrayFromProducts[0].carbohydrates, amt: 2000},

]

const SingleProductSite = () => (

    <div>

        <h1 style={{textAlign: 'center', color: '#E65100'}}>
            {arrayFromProducts[0].value}
        </h1>
        <Grid fluid>

            <Row center="xs" middle="xs">
                <Col xs={12} md={6}>
                    <Table >
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn style={fontSizes}>category:</TableRowColumn>
                                <TableRowColumn style={fontSizes}>{arrayFromProducts[0].category}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn style={fontSizes}>kcal: </TableRowColumn>
                                <TableRowColumn style={fontSizes}>{arrayFromProducts[0].kcal}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn style={fontSizes}>fat:</TableRowColumn>
                                <TableRowColumn style={fontSizes}>{arrayFromProducts[0].fat}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn style={fontSizes}>carbohydrates:</TableRowColumn>
                                <TableRowColumn style={fontSizes}>{arrayFromProducts[0].carbohydrates}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn style={fontSizes}>protein:</TableRowColumn>
                                <TableRowColumn style={fontSizes}>{arrayFromProducts[0].protein}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Col>

                <Col sxs={12} md={6}>
                    <img src={arrayFromProducts[0].pic} alt={arrayFromProducts[0].value} width={'80%'}/>
                </Col>
            </Row>

            <Row center="xs" middle="xs">
                <Col xs={12} md={6}>

                    <BarChart width={600} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="product" fill="#FBC02D" />
                        <Bar dataKey="dailyNorm" fill="#EF6C00" />
                    </BarChart>


                </Col>
                <Col xs={12} md={6}  center="xs">
                    <RaisedButton
                        name={'addAProductToFavorites'}
                        backgroundColor={'#E65100'}
                        label={<span style={{color: 'white'}}>Add to favorites</span>}
                    />
                </Col>
            </Row>


        </Grid>
    </div>
)

export default SingleProductSite