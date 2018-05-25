import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
// Redux & state
import { connect } from 'react-redux'
import { getFavorites } from './state/favorites'

import PieChart from './Charts/PieChart'
import LineChartPic from './Charts/LineChartPic'
import Paper from 'material-ui/Paper'
import ShareButtonFacebook from './ShareButtonFacebook';

const styles = {
    width: '100%',
    margin: '10px',
    textAlign: 'center'
}

class Dashboard extends React.Component {
    state = {
        LineChartPic: {
            width: 500,
            height: 300
        }
    }

    componentDidMount() {
        this.onResize()
        this.props.getFavorites()
        window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize = () => {
        if (window.innerWidth < 540) {
            this.setState({
                LineChartPic: {
                    width: 300,
                    height: 200
                }
            })
        }
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Paper style={styles}>
                        <h2>Macronutrients in today's meals</h2>
                    </Paper>
                    <Row style={styles}>
                        <Col md>
                            <PieChart center />
                        </Col>
                        <Col md center={"true"}>
                            <LineChartPic widthOfLineChart={this.state.LineChartPic.width}
                                heightOfLineChart={this.state.LineChartPic.height} />
                        </Col>
                    </Row>
                </Row>
                <ShareButtonFacebook />
            </Grid>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        getFavorites: () => dispatch(getFavorites())
    })
)(Dashboard)