import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

const Sidebar = (props) => (
  
  <Drawer
    docked={false}
    open={props.open}
    onRequestChange={props.handler}
  >
    <Link
      to={'/'}
    >
      <MenuItem
        onClick={props.close}
      >
        Home
      </MenuItem>
    </Link>
    <Link
      to={'library'}
    >
      <MenuItem
        onClick={props.close}
      >
        Library
      </MenuItem>
    </Link>
    <Link
      to={'/favourites'}
    >
      <MenuItem
        onClick={props.close}
      >
        Favourite Products
      </MenuItem>
    </Link>
  </Drawer>

)

export default Sidebar
