import React from 'react'
import { Link } from 'react-router-dom'
// UI
import style from './UI/style'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { ActionHome, AvLibraryBooks, ActionFavorite, AvLibraryAdd } from 'material-ui/svg-icons'

const Sidebar = (props) => (
  <Drawer
    docked={false}
    open={props.open}
    onRequestChange={props.handler}
  >
    <AppBar
      onLeftIconButtonClick={props.handler}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
      style={{
        backgroundColor: '#FF9800',
      }}
    />
    <Link
      to={'/'}
      style={style.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={style.sidebarItem}>
          <ActionHome style={style.block} />
          &nbsp;Home
        </p>
      </MenuItem>
    </Link>
    <Link
      to={'/library'}
      style={style.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={style.sidebarItem}>
          <AvLibraryBooks style={style.block} />
          &nbsp;Library
        </p>
      </MenuItem>
    </Link>
    <Link
      to={'/favorites'}
      style={style.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={style.sidebarItem}>
          <ActionFavorite style={style.block} />
          &nbsp;Favorite Products
        </p>
      </MenuItem>
    </Link>
    <Link
      to={'/add-product'}
      style={style.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={style.sidebarItem}>
          <AvLibraryAdd style={style.block} />
          &nbsp;Add New Product
        </p>
      </MenuItem>
    </Link>

  </Drawer>

)

export default Sidebar
