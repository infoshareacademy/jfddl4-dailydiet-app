import React from 'react'
import {connect} from "react-redux";
import {mealDate, mealSyncer} from '../state/mealPlan'
import BreakfastTable from '../Tables/BreakfastTable'
import LunchTable from '../Tables/LunchTable'
import DinnerTable from '../Tables/DinnerTable'

import DatePicker from 'material-ui/DatePicker';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {stylesForTables} from '../styles.js'


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
        if (this.props.breakfast !== undefined) {
            const arrayOfMeal = this.props.breakfast.map(products => products)
            this.props.products.map(key => {
                if (key.key === arrayOfMeal.find(product => product === key.key)) {
                    this.state.myProdBreakfast.push(key)
                }
            })
            const breakfastArr = [...new Set(this.state.myProdBreakfast)]
            this.setState({myProdBreakfast: breakfastArr})
        } else {
            alert('you need to pick date first')
        }
    }

    findLunchInProducts = () => {
        if (this.props.lunch !== undefined) {
            const arrayOfMeal = this.props.lunch.map(products => products)
            this.props.products.map(key => {
                if (key.key === arrayOfMeal.find(product => product === key.key)) {
                    this.state.myProdLunch.push(key)
                }
            })
            const lunchArr = [...new Set(this.state.myProdLunch)]
            this.setState({myProdLunch: lunchArr})
        } else {
            alert('you need to pick date first')
        }
    }

    findDinnerInProducts = () => {
        if (this.props.dinner !== undefined) {
            const arrayOfMeal = this.props.dinner.map(products => products)
            this.props.products.map(key => {
                if (key.key === arrayOfMeal.find(product => product === key.key)) {
                    this.state.myProdDinner.push(key)
                }
            })
            const dinnerArr = [...new Set(this.state.myProdDinner)]
            this.setState({myProdDinner: dinnerArr})
        } else {
            alert('you need to pick date first')
        }
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
                <Paper style={stylesForTables}>
                    <DatePicker
                        style={stylesForTables}
                        hintText="Pick a date to see the meal plan"
                        mode="landscape"
                        onClick={() => {
                            this.setState({
                                myProdBreakfast: [],
                                myProdLunch: [],
                                myProdDinner: [],
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
                </Paper>
                <Paper style={stylesForTables}>
                    <Card expanded={this.state.expanded}
                          onExpandChange={() => {
                              this.findBreakfastInProducts()
                              this.handleExpandChange()
                          }}
                    >
                        <CardHeader
                            title="Breakfast"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <BreakfastTable
                                productsForBreakfastTable={this.state.myProdBreakfast}
                            />
                        </CardText>
                    </Card>
                </Paper>
                <Paper style={stylesForTables}>
                    <Card expanded={this.state.expanded}
                          onExpandChange={() => {
                              this.findLunchInProducts()
                              this.handleExpandChange()

                          }}
                    >
                        <CardHeader
                            title="Lunch"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <LunchTable
                                productsForLunchTable={this.state.myProdLunch}
                            />
                        </CardText>
                    </Card>
                </Paper>
                <Paper style={stylesForTables}>
                    <Card expanded={this.state.expanded}
                          onExpandChange={() => {
                              this.findDinnerInProducts()
                              this.handleExpandChange()

                          }}
                    >
                        <CardHeader
                            title="Dinner"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <DinnerTable
                                productsForDinnerTable={this.state.myProdDinner}
                            />
                        </CardText>
                    </Card>
                </Paper>
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
