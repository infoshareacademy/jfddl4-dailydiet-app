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
        products: data,
        lookingForProducts: null,
        valueSelectedRadioButton: 'Category'

    }


    componentDidMount() {

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

    // this function maps an object into array of objects
    // and puts object keys into key property of array items
    // mapObjectToArray = (obj) => (
    //     Object.entries(obj || {})
    //         .map(([key, value]) => (
    //             typeof value === 'object' ?
    //                 { ...value, key }
    //                 :
    //                 { key, value }
    //         ))
    // )




    handleSlider = (event, value) => {
        this.setState({ slider: transform(value) });
    }


    render() {
        return (
            <Container>
                <Container>

                    <h2>Search by</h2>
                    <RadioButtonGroup
                        name="shipSpeed"
                        defaultSelected="Name"
                        onChange={(e, v) => this.setState({ valueSelectedRadioButton: v })}
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
                        onChange={() => { /* setState*/

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
                <RaisedButton
                    primary={true}

                    label={'Chesee'}
                />
                <RaisedButton
                    primary={true}

                    label={'Meat'}
                />
                <RaisedButton
                    primary={true}

                    label={'Vegetables'}
                />
                <RaisedButton
                    primary={true}

                    label={'Fruits'}
                />
                <RaisedButton
                    primary={true}

                    label={'Pasta, rise etc'}
                />
                <RaisedButton
                    primary={true}

                    label={'Beverage'}
                />
                <Container title={'Slider dziala'}>
                    this.state.tasks.map(
                task => (
            <div
                        key={task.key}
                        onClick={}
                    > {task.value}</div> ))

                </Container>

            </Container>
        )
    }

}

export default ProductsSearchList