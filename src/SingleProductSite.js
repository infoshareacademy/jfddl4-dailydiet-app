import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'


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
                <Col xs={12} md={6}>
                    <h2>category: {arrayFromProducts[0].category}</h2>
                    <p>kcal: {arrayFromProducts[0].kcal}</p>
                    <p>fat: {arrayFromProducts[0].fat}</p>
                    <p>carbohydrates: {arrayFromProducts[0].carbohydrates}</p>
                    <p>protein: {arrayFromProducts[0].protein}</p>
                </Col>
                <Col
                    xs={12} md={6}>
                    <img src={arrayFromProducts[0].pic} alt={arrayFromProducts[0].value} width={'150vw'}/>
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
                        label={<span style={{ color: 'white' }}>"Add to favorites"</span>}
                    />
                </Col>
            </Row>

        </Grid>
    </div>
)

export default SingleProductSite