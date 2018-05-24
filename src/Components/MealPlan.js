import React from 'react'
import {connect} from "react-redux";
import {mealDate, mealTime, mealSyncer} from '../state/mealPlan'
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


class MealPlan extends React.Component {
    state = {
        open: false,
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
                    onClick={() => this.props.mealTime(values[i])}
                />
            );
        }
        return (
            <div>
                <DatePicker
                    hintText="Landscape Dialog"
                    mode="landscape"
                    value={{}}
                    onChange={(ev, value) => {
                        this.props.mealDate(value)
                        this.handleOpen()
                    }}
                >
                    <RaisedButton
                        name={'showMealPlan'}
                        backgroundColor={'#E65100'}
                        label={<span style={{color: 'white'}}>Show meal plan</span>}
                    />
                </DatePicker>

                <Dialog
                    title="Choose a meal time"
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
                                this.props.mealSyncer()
                                this.handleClose()
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
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    mealDate: (theValue) => dispatch(mealDate(theValue)),
    mealTime: (theValue) => dispatch(mealTime(theValue)),
    mealSyncer: () => dispatch(mealSyncer())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealPlan)