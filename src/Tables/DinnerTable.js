import React from 'react'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

const DinnerTable = (props) => {
    return (
        <Table>
            <TableBody displayRowCheckbox={false}>
                {props.dinner.map((product, key) => {
                    return (<TableRow key={key}>
                            <TableRowColumn>
                                {product}
                            </TableRowColumn>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}


export default (DinnerTable)