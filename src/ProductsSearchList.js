import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Container from './UI/Container';
import Slider from 'material-ui/Slider';
import InputRange from 'react-input-range';
import { data } from './mockProducts'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
//Slider
const min = 0;
const max = Math.pow(10, 6);
const power = 12;

function transform(value) {
    return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
}

function reverse(value) {
    return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
}
//EndOfSlider
class ProductsSearchList extends React.Component {

    state = {
        slider: Math.pow(10, 4),
        products: [],
        lookingForProducts: [],
        valueSelectedRadioButton: 'Category',
        textField: ''

    }


    componentDidMount() { // pobranie danych i zamiana na tablice obiektów

        fetch('https://dailydiet-app.firebaseio.com/products/.json')
            .then((response) => response.json())
            .then((myJson) => {
                const dataInArray = (
                    Object.entries(myJson)
                        .map(el => ({
                            key: el[0],
                            value: el[1]
                        }))
                )
                this.setState({ products: dataInArray })
                console.log(dataInArray)
            })
    }


    handleSlider = (event, value) => {
        this.setState({ slider: transform(value) });
    }

    // onChange = (stateOfRadioButtonGoup) => {


        
    // const lokingForProducts = this.state.products.map((el,i,arr) =>
    //         {
    //             if(stateOfRadioButtonGoup === el.value.category) return 
    //         }
    // )
    // }


    render() {
        return (
            <Container>
                <Container>
{/*(e, v) => this.setState({ valueSelectedRadioButton: v })*/}
                    <h2>Search by</h2>
                    <RadioButtonGroup
                        name="shipSpeed"
                        defaultSelected="Name"
                        onChange={() => this.searchProductBy(this.state.valueSelectedRadioButton)}
                    >
                        <RadioButton
                            value="Category"
                            label="Category"
                        />
                        <RadioButton
                            value="Nutritional value"
                            label="Nutritional value"
                        />
                        <RadioButton
                            value="Name"
                            label="Name"
                        />
                    </RadioButtonGroup>

                    <TextField
                        placeholder={'Type product which you want find'}
                        fullWidth={true}
                        onChange={(target, value) => { this.setState({textField: value })

                        }}
                    />
                    <RaisedButton
                        onClick={() => {
                            console.log(this.state.phrase)
                        }}
                        primary={true}
                        fullWidth={true}
                        label={'Search'}
                    />
                </Container>

                <Container
                    title={'Slider dziala'}
                >
                    <Slider
                        min={min}
                        max={max}
                        step={max / 100}
                        value={reverse(this.state.slider)}
                        onChange={this.handleSlider}
                    />
                    <p>
                        <span>{'Calories: '}</span>
                        <span>{this.state.slider}</span>
                    </p>
                </Container>
                
                <Container title={'Slider dziala'}>
                    {this.state.lookingForProducts.map(
                        task => (
                            <div>
                                // key={task.key}
                                // onClick={() => { }}
                             
                            {task.value.name}
                            
                            </div>))}

                </Container>

            </Container>
        )
    }

}

export default ProductsSearchList