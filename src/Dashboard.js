import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'

import PieChart from './Charts/PieChart'
import Chart2 from './Charts/Chart2'
import Paper from 'material-ui/Paper'

const styles = {
    width: '100%',
    margin: '10px',
    textAlign: 'center'
}

const Dashboard = () => (
    <Grid fluid>

            <Row>
                <Paper style={styles}>
                    <h2>Micronutrients in today's meals</h2>
                </Paper>
                <Row  style={styles}>
                    <Col md>
                        <PieChart  center/>
                    </Col>
                    <Col md center>
                        <Chart2/>
                    </Col>
                </Row>
            </Row>

    </Grid>

)

export default Dashboard 