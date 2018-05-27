import React from 'react'
import Paper from 'material-ui/Paper'


export const textFieldStyle = {
    border: '10px',
    boxSizing: 'border-box',
    display: 'inline-block',
    fonFamily: 'Roboto',
    webkiTapHighlightColor: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    textDecoration: 'none',
    margin: '0px',
    padding: '0px',
    outline: 'none',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    position: 'relative',
    height: '36px',
    lineHeight: '36px',
    width: '100%',
    borderRadius: '2px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    backgroundClor: 'rgb(230, 81, 0)',
    textAlign: 'center',
}
export const styleForDatePicker = {
    margin: 'auto',
    textAlign: 'center',
    padding: '10px',
    overflow: 'hidden'
}
export const mealPlanCardTitleFont = {
    fontSize: '24px'
}

const styles = {
    default: {
        margin: '20px',
        padding: '20px'
    },
    centered: {
        textAlign: 'center'
    }
}


const PaperRefined = (props) => (
    <Paper
        style={
            props.centered ?
                {...styles.default, ...styles.centered}
                :
                styles.default
        }
    >
        {props.children}
    </Paper>
)

export default PaperRefined
