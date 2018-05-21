import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'

import PieChart from '../Charts/PieChart'
import LineChartPic from '../Charts/LineChartPic'
import Paper from 'material-ui/Paper'
import ShareButtonFacebook from '../ShareButtonFacebook';
import {connect} from 'react-redux'


const styles = {
    width: '100%',
    margin: '10px',
    textAlign: 'center'
}

const Dashboard = (props) => {

    const onResizeWidthOfLineChart = () => {
        if (window.innerWidth > 768) {
            return 400
        }
        else if (window.innerWidth > 450) {
            return 300
        }
        else {
            return 300
        }
    }
    const onResizeHeightOfLineChart = () => {
        if (window.innerWidth > 768) {
            return 300
        }
        else if (window.innerWidth > 450) {
            return 250
        }
        else {
            return 250
        }
    }

    return (
        <Grid fluid>

            <Row>
                <Paper style={styles}>
                    <h2>Macronutrients in today's meals</h2>
                </Paper>
                <Row style={styles}>
                    <Col md>
                        <PieChart center/>
                    </Col>
                    <Col md center={"true"}>
                        <LineChartPic
                            widthOfLineChart={onResizeWidthOfLineChart()}

                            heightOfLineChart={onResizeHeightOfLineChart()}/>
                    </Col>
                </Row>
            </Row>
            <ShareButtonFacebook/>
        </Grid>

    )
}

export default connect(
    state => ({
        products: state.products
    })
)(Dashboard)