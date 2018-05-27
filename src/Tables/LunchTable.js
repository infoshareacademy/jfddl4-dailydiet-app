import React from 'react'
import {Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn,} from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'

const LunchTable = (props) => {

    return (
        <Table>

            <TableHeader displaySelectAll={false}
                         adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Kcal</TableHeaderColumn>
                    <TableHeaderColumn>Fat</TableHeaderColumn>
                    <TableHeaderColumn>Carb.</TableHeaderColumn>
                    <TableHeaderColumn>Prot.</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {props.productsForLunchTable.map((product, key) => {
                    return <TableRow key={key}>
                        <TableRowColumn>
                            {product.name}
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
                <TableRow>
                    <TableRowColumn style={{fontWeight: 'bold'}}>
                        All:
                    </TableRowColumn>
                    <TableRowColumn style={{fontWeight: 'bold'}}>
                        {props.productsForLunchTable.map(product => product.kcal)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn style={{fontWeight: 'bold'}}>
                        {props.productsForLunchTable.map(product => product.fat)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn style={{fontWeight: 'bold'}}>
                        {props.productsForLunchTable.map(product => product.carbohydrates)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn style={{fontWeight: 'bold'}}>
                        {props.productsForLunchTable.map(product => product.protein)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
    )
}


export default (LunchTable)