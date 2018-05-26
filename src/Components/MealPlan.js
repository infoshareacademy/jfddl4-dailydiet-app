import React from 'react'
import {connect} from "react-redux";
import {mealDate, mealSyncer, getLunch, getBreakfast, getDinner} from '../state/mealPlan'
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

        return (
            <div>
                <DatePicker
                    hintText="Landscape Dialog"
                    mode="landscape"
                    onChange={(ev, value) => {
                        this.props.mealDate(value)
                        this.handleOpen()
                    }}
                >
                    <RaisedButton
                        name={'showMealPlan'}
                        backgroundColor={'#E65100'}
                        label={<span style={{color: 'white'}}>Show meal plan</span>}
                        onClick={() => {
                            this.props.mealSyncer()
                            this.props.getBreakfast()
                            this.props.getLunch()
                            this.props.getDinner()
                            this.handleClose()
                        }
                        }
                    />
                </DatePicker>

            </div>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    mealDate: (theValue) => dispatch(mealDate(theValue)),
    mealSyncer: () => dispatch(mealSyncer()),
    getBreakfast: () => dispatch(getBreakfast()),
    getLunch: () => dispatch(getLunch()),
    getDinner: () => dispatch(getDinner()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealPlan)