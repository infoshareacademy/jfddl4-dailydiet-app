import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';


const exampleProduct = {
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

const arrayFromProducts = Object.entries(exampleProduct)
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


const SingleProductSite = () => (

    <div>
        <h1 style={{textAlign: 'center', color: '#E65100'}}>
            {arrayFromProducts[0].value}
        </h1>
        <Grid fluid>

            <Row center="xs" middle="xs">
                <Col xs={8} md={4}>
                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>category:</TableRowColumn>
                                <TableRowColumn>{arrayFromProducts[0].category}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>kcal: </TableRowColumn>
                                <TableRowColumn>{arrayFromProducts[0].kcal}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>fat:</TableRowColumn>
                                <TableRowColumn>{arrayFromProducts[0].fat}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>carbohydrates:</TableRowColumn>
                                <TableRowColumn>{arrayFromProducts[0].carbohydrates}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>protein:</TableRowColumn>
                                <TableRowColumn>{arrayFromProducts[0].protein}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Col>

                <Col
                    xs={12} md={6}>
                    <img src={arrayFromProducts[0].pic} alt={arrayFromProducts[0].value} width={'80%'}/>
                </Col>
            </Row>

            <Row center="xs" middle="xs">
                <Col xs={12} md={6}>
                    <h1>CHART</h1>
                </Col>
                <Col xs={12} md={6}>
                    <RaisedButton
                        name={'addAProductToFavorites'}
                        backgroundColor={'#E65100'}
                        label={<span style={{color: 'white'}}>"Add to favorites"</span>}
                    />
                </Col>
            </Row>

        </Grid>
    </div>
)

export default SingleProductSite