import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import PieChart from './Charts/PieChart'
import Chart2 from './Charts/Chart2'


const Dashboard = () => (

    <Grid fluid>
        <Row>
            <Col xs={6} md={3}>
                <PieChart/>
            </Col>
            <Col xs={6} md={3}>
                <Chart2/>
            </Col>
        </Row>
    </Grid>

)

export default Dashboard 