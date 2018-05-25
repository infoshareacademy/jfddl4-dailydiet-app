import React from 'react'
import {connect} from 'react-redux'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

const fontSizes = {
    fontSize: '24px',
}

const SingleProductCTable = (props) => {
    const productKey = props.tableProduct
    const product = props.products.find(
        product => product.key === productKey
    )

    return (
        <Table>
            <TableBody displayRowCheckbox={false}>
                <TableRow>
                    <TableRowColumn style={fontSizes}>category:</TableRowColumn>
                    <TableRowColumn
                        style={fontSizes}>{product.category}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn style={fontSizes}>kcal: </TableRowColumn>
                    <TableRowColumn
                        style={fontSizes}>{product.kcal}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn style={fontSizes}>fat:</TableRowColumn>
                    <TableRowColumn
                        style={fontSizes}>{product.fat}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn style={fontSizes}>carbohydrates:</TableRowColumn>
                    <TableRowColumn
                        style={fontSizes}>{product.carbohydrates}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn style={fontSizes}>protein:</TableRowColumn>
                    <TableRowColumn
                        style={fontSizes}>{product.protein}</TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
    )
}


export default connect(
    state => ({
        products: state.products
    })
)(SingleProductCTable)