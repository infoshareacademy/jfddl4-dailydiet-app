import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'

import PieChart from './Charts/PieChart'
import LineChartPic from './Charts/Chart2'
import Paper from 'material-ui/Paper'

const styles = {
    width: '100%',
    margin: '10px',
    textAlign: 'center'
}

class Dashboard extends React.Component {

    componentDidMount(){
        window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.onResize)
    }

    onResize = () => {
        console.log(window.innerWidth)
    }

    render() {
        return (
            <Grid fluid>

                <Row>
                    <Paper style={styles}>
                        <h2>Micronutrients in today's meals</h2>
                    </Paper>
                    <Row style={styles}>
                        <Col md>
                            <PieChart center/>
                        </Col>
                        <Col md center={"true"}>
                            <LineChartPic/>
                        </Col>
                    </Row>
                </Row>

            </Grid>

        )
    }
}

export default Dashboard 