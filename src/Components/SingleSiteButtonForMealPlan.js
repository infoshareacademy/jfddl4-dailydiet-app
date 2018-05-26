import React from 'react'
import {connect} from "react-redux";
import {mealDate, mealSyncer} from '../state/mealPlan'
import BreakfastTable from '../Tables/BreakfastTable'
import LunchTable from '../Tables/LunchTable'
import DinnerTable from '../Tables/DinnerTable'

import DatePicker from 'material-ui/DatePicker';
import {Card, CardHeader, CardText} from 'material-ui/Card';


class SingleSiteButtonForMealPlan extends React.Component {
    state = {
        dateOpen: false,
        cardOpen: false,
        myProd: []


    }

    findBreakfastInProducts = () => {
        const arrayOfMeal = this.props.breakfast.map(products => products)
        const arrayOfProductsKeys = this.props.products.map(key => {
            if (key.key === arrayOfMeal.find(product => product === key.key)) {
                this.state.myProd.push(key)
            }
        })
    }


    handleDateOpen = () => {
        this.setState({dateOpen: true});
    }

    render() {

        return (
            <div>
                <DatePicker
                    hintText="Pick a date to see the meal plan"
                    mode="landscape"
                    onChange={(ev, value) => {
                        this.props.mealDate(value)
                        this.handleDateOpen()
                        this.props.mealSyncer()
                    }}

                >
                </DatePicker>
                <Card
                    onExpandChange={() => this.findBreakfastInProducts()}
                >
                    <CardHeader
                        title="Breakfast"
                        subtitle={`${this.props.mealDateState}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <BreakfastTable
                            productsForBreakfastTable={this.state.myProd}
                        />
                    </CardText>
                </Card>
                <Card>
                    <CardHeader
                        title="Lunch"
                        subtitle={`${this.props.mealDateState}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <LunchTable
                            lunch={this.props.lunch}/>
                    </CardText>
                </Card>
                <Card>
                    <CardHeader
                        title="Dinner"
                        subtitle={`${this.props.mealDateState}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <DinnerTable
                            dinner={this.props.dinner}/>
                    </CardText>
                </Card>


            </div>
        )
    }
}

const mapStateToProps = state => ({
    mealDateState: state.mealPlan.mealDate,
    breakfast: state.mealPlan.breakfast,
    lunch: state.mealPlan.lunch,
    dinner: state.mealPlan.dinner,
    products: state.products

})

const mapDispatchToProps = dispatch => ({
    mealDate: (theValue) => dispatch(mealDate(theValue)),
    mealSyncer: () => dispatch(mealSyncer()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSiteButtonForMealPlan)

