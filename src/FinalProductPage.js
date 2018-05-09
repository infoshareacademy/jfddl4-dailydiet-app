import React, {Component} from 'react';


class Products extends Component {
    state = {
        products: null
    }


    componentDidMount() {

        fetch('https://dailydiet-app.firebaseio.com/products/.json')
            .then((response) => response.json())
            .then((myJson) => {
                const dataInArray = (
                    Object.entries(myJson)
                        .map(el => ({
                            key: el[0],
                            value: el[1].name
                        }))
                )
                this.setState({ products: dataInArray })
                console.log(dataInArray)
            })
    }

    render() {
        return (
            <div>
                {
                    !this.state.products ?
                        'loading...'
                        :
                        <ul>
                            {this.state.products.map(
                                aProduct => (
                                    <li key={aProduct.key}
                                    >
                                        {aProduct.value}
                                    </li>)
                            )
                            }
                        </ul>
                }
            </div>

        )
    }

}

export default Products