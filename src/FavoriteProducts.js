import React from 'react'
// Firebase
import firebase from 'firebase'
// Material-ui
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const PRODUCTS_RESOURCE_PATH = `https://dailydiet-app.firebaseio.com/products`

class FavoriteProducts extends React.Component {
  state = {
    products: null,
    isDialogOpen: false
  }

  componentDidMount() {
    this.readFromDB()
  }

  readFromDB = () => (
    fetch(`${PRODUCTS_RESOURCE_PATH}/.json`)
      .then(response => response.json())
      .then(data => {
        const dataInArray =
          (Object.entries(data || {})
            .map(([key, value]) => (
              typeof value === 'object' ?
                { ...value, key }
                :
                { key, value }
            ))
          )

        this.setState({
          products: dataInArray
        })

        console.log(dataInArray)
      })
  )

  toggleFavorite = (key) => {
    const url = `${PRODUCTS_RESOURCE_PATH}/${key}/.json`

    const fetchConfig = {
      method: "PATCH",
      body: JSON.stringify({
        "isFavorite": false
      })
    }

    fetch(url, fetchConfig)
      .then(this.readFromDB)
  }

  handleOpen = () => {
    this.setState({ isDialogOpen: true })
  }

  handleClose = () => {
    this.setState({ isDialogOpen: false })
  }

  render() {
    console.log(this.state.products)
    return (
      <div>
        <h1>Favorite products</h1>
        {
          !this.state.products ?
            'Loading...'
            :
            <List>
              {
                this.state.products
                  .filter(el =>
                    el.isFavorite
                  )
                  .map(
                    el => (
                      <ListItem
                        key={el.key}
                        primaryText={el.name}
                        insetChildren={true}
                        leftAvatar={<Avatar src={el.picture} />}
                        rightAvatar={
                          <div>
                            <IconButton
                              onClick={this.handleOpen}
                            >
                              <ActionGrade />
                            </IconButton>
                            <Dialog
                              title="Confirm"
                              actions={[
                                <FlatButton
                                  label="Cancel"
                                  primary={true}
                                  onClick={this.handleClose}
                                />,
                                <FlatButton
                                  label="Confirm"
                                  primary={true}
                                  keyboardFocused={true}
                                  onClick={() => {
                                    this.handleClose()
                                    this.toggleFavorite(el.key)
                                  }}
                                />,
                              ]}
                              modal={false}
                              open={this.state.isDialogOpen}
                              onRequestClose={this.handleClose}
                            >
                              Remove {el.name} from favorites?
                          </Dialog>
                          </div>
                        }
                      >
                      </ListItem>
                    )
                  )
              }
            </List>
        }
      </div>
    )
  }

}

export default FavoriteProducts