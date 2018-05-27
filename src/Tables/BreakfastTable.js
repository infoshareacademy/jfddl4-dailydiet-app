import React from 'react'
import {Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn,} from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'

const BreakfastTable = (props) => {

    return (
        <Table>
            <TableHeader displaySelectAll={false}
                         adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn style={{fontSize: '16px'}}>Img</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '16px'}}>Category</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '16px'}}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '16px'}}>Kcal</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '16px'}}>Fat</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '16px'}}>Carbohydrates</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '16px'}}>Protein</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {props.productsForBreakfastTable.map((product, key) => {
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
                <TableRow>
                    <TableRowColumn>
                        {}
                    </TableRowColumn>
                    <TableRowColumn>
                        {}
                    </TableRowColumn>
                    <TableRowColumn style={{fontWeight: 'bold'}}>
                        All together:
                    </TableRowColumn>
                    <TableRowColumn>
                        {props.productsForBreakfastTable.map(product => product.kcal)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn>
                        {props.productsForBreakfastTable.map(product => product.fat)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn>
                        {props.productsForBreakfastTable.map(product => product.carbohydrates)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn>
                        {props.productsForBreakfastTable.map(product => product.protein)
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

export default (BreakfastTable)

