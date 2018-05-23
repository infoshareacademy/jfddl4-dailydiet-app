import React from 'react'
import Paper from 'material-ui/Paper'

const styles = {
    default: {
        boxSizing: 'border-box',
        margin: '15px',
        padding: '15px'
    },
    centered: {
        textAlign: 'center'
    }
}

const Container = (props) => (
    <Paper
        style={
            props.centered ?
                { ...styles.default, ...styles.centered }
                :
                styles.default
        }
    >
        {props.children}
    </Paper>
)

export default Container