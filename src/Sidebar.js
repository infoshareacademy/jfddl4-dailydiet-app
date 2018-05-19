import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { ActionHome, AvLibraryBooks, ActionFavorite, AvLibraryAdd } from 'material-ui/svg-icons'

const styles = {
  link: {
    textDecoration: 'none'
  },
  topBar: {
    height: '64px',
    width: '100%',
    background: '#FF9800'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  block: {
    display: 'inline-block'
  }
}

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
      style={styles.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={styles.flex}>
          <ActionHome style={styles.block} />
          &nbsp;Home
        </p>
      </MenuItem>
    </Link>
    <Link
      to={'/library'}
      style={styles.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={styles.flex}>
          <AvLibraryBooks style={styles.block} />
          &nbsp;Library
        </p>
      </MenuItem>
    </Link>
    <Link
      to={'/favorites'}
      style={styles.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={styles.flex}>
          <ActionFavorite style={styles.block} />
          &nbsp;Favorite Products
        </p>
      </MenuItem>
    </Link>
    <Link
      to={'/add-product'}
      style={styles.link}
    >
      <MenuItem
        onClick={props.close}
      >
        <p style={styles.flex}>
          <AvLibraryAdd style={styles.block} />
          &nbsp;Add New Product
        </p>
      </MenuItem>
    </Link>

  </Drawer>

)

export default Sidebar
