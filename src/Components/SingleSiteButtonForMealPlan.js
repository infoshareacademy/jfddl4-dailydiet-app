import React from 'react'
import {connect} from "react-redux";
import {mealDate, mealSyncer} from '../state/mealPlan'
import BreakfastTable from '../Tables/BreakfastTable'
import LunchTable from '../Tables/LunchTable'
import DinnerTable from '../Tables/DinnerTable'
import AllMeals from '../Tables/AllMeals'

import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import PaperRefined, {stylesForTables, styleForDatePicker} from '../styles.js'
import {Grid, Row, Col} from 'react-flexbox-grid'


class SingleSiteButtonForMealPlan extends React.Component {
    state = {
        dateOpen: false,
        cardOpen: false,
        myProdBreakfast: [],
        myProdLunch: [],
        myProdDinner: [],
        expanded: false,
        allMeals: [],
        modalOpen: false,
    }

    handleModalOpen = () => {
        this.setState({modalOpen: true});
    };

    handleModalClose = () => {
        this.setState({modalOpen: false});
    };


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
        }
    }
    findAllMeals = () => {
        if (this.props.meals !== undefined) {
            const arrayOfMeal = this.props.meals
            const allMeals = []
            arrayOfMeal.forEach(key => {
                const productFiltered = this.props.products.filter(product => key === product.key)
                if (productFiltered.length) {
                    allMeals.push(productFiltered[0])
                }
            })
            this.setState({allMeals})
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
                <Row center="xs" middle="xs">
                    <PaperRefined>
                        <RaisedButton
                            name={'addAProductToCalendar'}
                            backgroundColor={'#E65100'}
                            label={<span style={{color: 'white'}}>Pick a date</span>}
                            onClick={this.handleModalOpen}
                        />
                        <Dialog
                            modal={false}
                            open={this.state.modalOpen}
                            onRequestClose={() => {
                                this.handleModalClose()
                                this.findBreakfastInProducts()
                                this.findLunchInProducts()
                                this.findDinnerInProducts()
                                this.findAllMeals()

                            }}
                            style={{width: '100vw', overflow: 'hidden'}}

                        >
                            Click below to pick a date.
                            <DatePicker
                                style={styleForDatePicker}
                                underlineStyle={{borderColor: "#E65100", width: '80%'}}
                                hintText="Pick a date"
                                mode="portrait"
                                onClick={() => {
                                    this.setState({
                                        myProdBreakfast: [],
                                        myProdLunch: [],
                                        myProdDinner: [],
                                        allMeals: [],

                                    })
                                    this.handleReduce()
                                }
                                }
                                onChange={(ev, value) => {
                                    this.props.mealDate(value)
                                    this.handleDateOpen()
                                    this.props.mealSyncer()


                                }}

                            />
                        </Dialog>
                    </PaperRefined>
                </Row>

                <Card expanded={this.state.expanded}
                      onExpandChange={() => {
                          if (this.props.breakfast !== undefined) {
                              this.handleExpandChange()
                          }
                          else {
                              alert('pick a date first')
                          }
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
                <Card expanded={this.state.expanded}
                      onExpandChange={() => {
                          if (this.props.lunch !== undefined) {
                              this.handleExpandChange()
                          }
                          else {
                              alert('pick a date first')
                          }
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
                <Card expanded={this.state.expanded}
                      onExpandChange={() => {
                          if (this.props.dinner !== undefined) {
                              this.handleExpandChange()
                          }
                          else {
                              alert('pick a date first')
                          }
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
                <Card expanded={this.state.expanded}
                      onExpandChange={() => {
                          if (this.props.allMeals !== undefined) {
                              this.handleExpandChange()
                          }
                          else {
                              alert('pick a date first')
                          }
                      }}
                >
                    <CardHeader
                        title="All meals"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <AllMeals
                            summaryProducts={this.state.allMeals}
                        />
                    </CardText>
                </Card>
            </div>
        )
    }
}

const
    mapStateToProps = state => ({
        mealDateState: state.mealPlan.mealDate,
        meals: state.mealPlan.meals,
        breakfast: state.mealPlan.breakfast,
        lunch: state.mealPlan.lunch,
        dinner: state.mealPlan.dinner,
        products: state.products

    })

const
    mapDispatchToProps = dispatch => ({
        mealDate: (theValue) => dispatch(mealDate(theValue)),
        mealSyncer: () => dispatch(mealSyncer()),
    })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSiteButtonForMealPlan)
