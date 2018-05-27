import React from 'react'
import {Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn,} from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'


const DinnerTable = (props) => {
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
                {props.productsForDinnerTable.map((product, key) => {
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
                        {props.productsForDinnerTable.map(product => product.kcal)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn>
                        {props.productsForDinnerTable.map(product => product.fat)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn>
                        {props.productsForDinnerTable.map(product => product.carbohydrates)
                            .reduce(function (result, products) {
                                products = products * 1
                                return result += products
                            }, 0)
                        }
                    </TableRowColumn>
                    <TableRowColumn>
                        {props.productsForDinnerTable.map(product => product.protein)
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


export default (DinnerTable)