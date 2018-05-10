import React from 'react'


const exampleProduct = [
    {
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
]


   const arrayFromProduct = Object.entries(exampleProduct)
        .map(el => ({
            key: el[0],
            value: el[1].name,
            pic: el[1].picture
        }))


const SingleProductSite = () => (

    <div>
        {arrayFromProduct.name}
    </div>
)

export default SingleProductSite