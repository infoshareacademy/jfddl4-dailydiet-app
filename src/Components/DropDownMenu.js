import React from 'react'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const DumbDropDownMenu = () => (

<DropDownMenu value={this.state.valueDropMenu} onChange={this.handleChange} openImmediately={false}>
    <MenuItem value={'every'} primaryText="Every" />
    <MenuItem value={'other'} primaryText="Other" />
    <MenuItem value={'dairy'} primaryText="Dairy" />
    <MenuItem value={'sweets'} primaryText="Sweets" />
    <MenuItem value={'drinks'} primaryText="Drinks" />
    <MenuItem value={'fruit'} primaryText="Fruit" />
    <MenuItem value={'vegetable'} primaryText="Vegetable" />
    <MenuItem value={'meat'} primaryText="Meat" />
</DropDownMenu>

)

 export default DumbDropDownMenu

