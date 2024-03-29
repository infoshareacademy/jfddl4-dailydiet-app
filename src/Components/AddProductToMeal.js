import React from 'react'
import {connect} from "react-redux";
import {addDate, addProductToMeal, addMeal} from "../state/addProductsToMeals";
import {textFieldStyle} from "../UI/styles";
import Snackbar from 'material-ui/Snackbar'
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


class AddProductToMeal extends React.Component {
    state = {
        open: false,
        snackBarOpen: false,
    }

    snackbarHandleClick = () => {
        this.setState({
            snackBarOpen: true,
        })
    }

    snackBarHandleRequestClose = () => {
        this.setState({
            snackBarOpen: false,
        })
    }
    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }


    render() {
        const radios = [];
        const values = ['breakfast', 'lunch', 'dinner']
        for (let i = 0; i < 3; i++) {
            radios.push(
                <RadioButton
                    key={i}
                    value={`${values[i]}`}
                    label={`${values[i]}`}
                    onClick={() => this.props.addMeal(values[i])}
                />
            );
        }
        return (
            <div>
                <DatePicker
                    underlineStyle={{borderColor: "#E65100"}}
                    textFieldStyle={textFieldStyle}
                    hintText="Pick a date"
                    mode="portrait"
                    value={{}}
                    onChange={(ev, value) => {
                        this.props.addDate(value)
                        this.handleOpen()
                    }}
                >
                    <RaisedButton
                        name={'addAProductToCalendar'}
                        backgroundColor={'#E65100'}
                        label={<span style={{color: 'white'}}>Add to calendar</span>}
                    />
                </DatePicker>
                <Dialog
                    title="Choose a meal"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={this.handleClose}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            keyboardFocused={true}
                            value={{}}
                            onClick={() => {
                                this.props.addProductToMeal(this.props.product)
                                this.handleClose()
                                this.snackbarHandleClick()
                            }
                            }
                        />,
                    ]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                        {radios}
                    </RadioButtonGroup>
                </Dialog>
                <Snackbar
                    open={this.state.snackBarOpen}
                    message={`Product has been added to calendar!`}
                    autoHideDuration={4000}
                    onRequestClose={this.snackBarHandleRequestClose}
                    bodyStyle={{backgroundColor: "#E65100", textAlign: 'center', fontWeight: 'bold'}}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

const mapDispatchToProps = dispatch => ({
    addProductToMeal: (myProduct) => dispatch(addProductToMeal(myProduct)),
    addDate: (dateValue) => dispatch(addDate(dateValue)),
    addMeal: (mealValue) => dispatch(addMeal(mealValue)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProductToMeal)