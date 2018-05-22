import React from 'react'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const DumbDropDownMenu = () => (
    /////////////////////////////////////////////////////////////////////{//TUTAJ WYSYŁKA DO STORA}
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

// w taki sposób przerzucamy dane ze stora do propsów danego komponentu
const mapStateToProps = state => ({ state: state })


// w taki sposób przypinamy akcje do stora przy danym komponencie
const mapDispatchToProps = dispatch => ({
    actions: {
        init: () => dispatch(ACTIONS.initialGetMessages()),
        handleSuccess: messages =>
            dispatch(ACTIONS.handleMessagesWithSuccess(messages)),
        handleError: error => dispatch(ACTIONS.handleMessagesWithError(error))
    }
})

// connect - łączy głupi komponent z danymi ze stora i z akcjami na storze
const DropDownMenu = connect(mapStateToProps, mapDispatchToProps)(
    DumbDropDownMenu
)

export { DropDownMenu }

