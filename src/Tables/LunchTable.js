import React from 'react'
import {Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn,} from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'

const LunchTable = (props) => {

    return (
        <Table>

            <TableHeader displaySelectAll={false}
                         adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>Img</TableHeaderColumn>
                    <TableHeaderColumn>Category</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Kcal</TableHeaderColumn>
                    <TableHeaderColumn>Fat</TableHeaderColumn>
                    <TableHeaderColumn>Carbohydrates</TableHeaderColumn>
                    <TableHeaderColumn>Protein</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {props.productsForLunchTable.map((product, key) => {
                    return <TableRow key={key}>
                        <TableRowColumn>
                            <Avatar
                                src={`${product.picture}`}
                                size={40}
                            />
                        </TableRowColumn>
                        <TableRowColumn>
                            {product.name}
                        </TableRowColumn>
                        <TableRowColumn>
                            {product.category}
                        </TableRowColumn>
                        <TableRowColumn>
                            {product.kcal}
                        </TableRowColumn>
                        <TableRowColumn>
                            {product.fat}
                        </TableRowColumn>
                        <TableRowColumn>
                            {product.carbohydrates}
                        </TableRowColumn>
                        <TableRowColumn>
                            {product.protein}
                        </TableRowColumn>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    )
}


export default (LunchTable)