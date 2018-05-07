import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Container from './UI/Container';
import Slider from 'material-ui/Slider';
import InputRange from 'react-input-range';

const min = 0;
const max = Math.pow(10, 6);
const power = 12;

function transform(value) {
    return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
}

function reverse(value) {
    return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
}

class ProductsSearchList extends React.Component {

    state = {
        slider: Math.pow(10, 4),
    };

    handleSlider = (event, value) => {
        this.setState({ slider: transform(value) });
    };


    render() {
        return (
            <Container>
                <Container>
                    <TextField
                        placeholder={'Type product which you want find'}
                        fullWidth={true}
                    />
                    <RaisedButton

                        primary={true}
                        fullWidth={true}
                        label={'Search'}
                    />
                </Container>
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

            </Container>
        )
    }

}

export default ProductsSearchList