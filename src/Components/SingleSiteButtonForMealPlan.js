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
        myProdBreakfast: [],
        myProdLunch: [],
        myProdDinner: [],
        expanded: false
    }

    findBreakfastInProducts = () => {
        const arrayOfMeal = this.props.breakfast.map(products => products)
        const arrayOfProductsKeys = this.props.products.map(key => {
            if (key.key === arrayOfMeal.find(product => product === key.key)) {
                this.state.myProdBreakfast.push(key)
            }
        })
        const breakfastArr = [...new Set(this.state.myProdBreakfast)]
        this.setState({myProdBreakfast: breakfastArr})
    }

    findLunchInProducts = () => {
        const arrayOfMeal = this.props.lunch.map(products => products)
        const arrayOfProductsKeys = this.props.products.map(key => {
            if (key.key === arrayOfMeal.find(product => product === key.key)) {
                this.state.myProdLunch.push(key)
            }
        })
        const lunchArr = [...new Set(this.state.myProdLunch)]
        this.setState({myProdLunch: lunchArr})
    }

    findDinnerInProducts = () => {
        const arrayOfMeal = this.props.dinner.map(products => products)
        const arrayOfProductsKeys = this.props.products.map(key => {
            if (key.key === arrayOfMeal.find(product => product === key.key)) {
                this.state.myProdDinner.push(key)
            }
        })
        const dinnerArr = [...new Set(this.state.myProdDinner)]
        this.setState({myProdDinner: dinnerArr})
    }

    handleDateOpen = () => {
        this.setState({dateOpen: true});
    }
    handleReduce = () => {
        this.setState({expanded: false});
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    }

    render() {

        return (
            <div>
                <DatePicker
                    hintText="Pick a date to see the meal plan"
                    mode="landscape"
                    onClick={() => {
                        this.setState({
                            myProdBreakfast: [],
                            myProdLunch: []
                        })
                        this.handleReduce()
                    }
                    }
                    onChange={(ev, value) => {
                        this.props.mealDate(value)
                        this.handleDateOpen()
                        this.props.mealSyncer()

                    }}

                >
                </DatePicker>
                <Card expanded={this.state.expanded}
                      onExpandChange={() => {
                          this.findBreakfastInProducts()
                          this.handleExpandChange()
                      }}
                >
                    <CardHeader
                        title="Breakfast"
                        subtitle={`${this.props.mealDateState}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <BreakfastTable
                            productsForBreakfastTable={this.state.myProdBreakfast}
                        />
                    </CardText>
                </Card>

                <Card expanded={this.state.expanded}
                      onExpandChange={() => {
                          this.findLunchInProducts()
                          this.handleExpandChange()

                      }}
                >
                    <CardHeader
                        title="Lunch"
                        subtitle={`${this.props.mealDateState}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <LunchTable
                            productsForLunchTable={this.state.myProdLunch}
                        />
                    </CardText>
                </Card>
                <Card expanded={this.state.expanded}
                      onExpandChange={() => {
                          this.findDinnerInProducts()
                          this.handleExpandChange()

                      }}
                >
                    <CardHeader
                        title="Dinner"
                        subtitle={`${this.props.mealDateState}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <DinnerTable
                            productsForDinnerTable={this.state.myProdDinner}
                        />
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
