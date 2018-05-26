import React from 'react'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

const BreakfastTable = (props) => {

    return (
        <Table>
            <TableBody displayRowCheckbox={false}>
                {props.productsForBreakfastTable.map((product, key) => {
                    return <TableRow key={key}>
                        <TableRowColumn>
                            {product.name}
                        </TableRowColumn>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    )
}


export default (BreakfastTable)