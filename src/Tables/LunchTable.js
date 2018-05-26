import React from 'react'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

const LunchTable = (props) => {

    return (
        <Table>
            <TableBody displayRowCheckbox={false}>
                {props.productsForLunchTable.map((product, key) => {
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


export default (LunchTable)