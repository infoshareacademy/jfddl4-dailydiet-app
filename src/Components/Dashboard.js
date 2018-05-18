import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'

import PieChart from '../Charts/PieChart'
import LineChartPic from '../Charts/LineChartPic'
import Paper from 'material-ui/Paper'
import ShareButtonFacebook from '../ShareButtonFacebook';

const styles = {
    width: '100%',
    margin: '10px',
    textAlign: 'center'
}

const Dashboard = (props) => {
    // state = {
    //     LineChartPic: {
    //         width: 500,
    //         height: 300
    //     }
    // }

    // componentDidMount()
    // {
    //     this.onResize()
    //     window.addEventListener('resize', this.onResize)
    // }
    //
    // componentWillUnmount()
    // {
    //     window.removeEventListener('resize', this.onResize)
    // }


    onResize = () => {
        console.log('test')
        if (window.innerWidth >800) {

            return {
                widthOfLineChart: 400,
                heightOfLineChart: 300
            }
        } else if (window.innerWidth >500) {

            return {
                widthOfLineChart: 300,
                heightOfLineChart: 200
            }
        } else {

            return {
                widthOfLineChart: 200,
                heightOfLineChart: 100
            }
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
                            widthOfLineChart={props.onResize}

                            heightOfLineChart={props.onResize}/>
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