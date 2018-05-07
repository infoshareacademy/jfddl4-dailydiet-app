import React from 'react'
import Paper from 'material-ui/Paper'

const styles = {
    paper: {
        margin: '15px',
        padding: '15px'
    }
}

const Container = (props) => (
    <Paper style={styles.paper}>
        {props.children}
    </Paper>
)

export default Container