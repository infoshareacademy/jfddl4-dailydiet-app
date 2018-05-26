import React from 'react'
import {connect} from "react-redux";
import {mealDate, mealSyncer} from '../state/mealPlan'
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton'


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
                        this.props.mealSyncer()
                    }}
                >
                    <RaisedButton
                        name={'showMealPlan'}
                        backgroundColor={'#E65100'}
                        label={<span style={{color: 'white'}}>Show meal plan</span>}
                        onClick={() => {
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealPlan)