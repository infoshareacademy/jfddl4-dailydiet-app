import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'



class Products extends Component {
    state = {
        products: null,
    }


    componentDidMount() {

        fetch('https://dailydiet-app.firebaseio.com/products/.json')
            .then((response) => response.json())
            .then((myJson) => {
                const dataInArray = (
                    Object.entries(myJson)
                        .map(el => ({
                            key: el[0],
                            value: el[1].name
                            // pic: el[2].picture //JAK ZROBIĆ ZEBY DZIAŁAŁO?? fixme
                        }))
                )
                this.setState({products: dataInArray})
                console.log(dataInArray)
            })
    }

    redirect //fixme


    render() {
        return (
            <div>
                {
                    !this.state.products ?
                        'loading...'
                        :
                        <List>
                            {this.state.products.map(
                                aProduct => (
                                    <ListItem key={aProduct.key}
                                              primaryText={aProduct.value}
                                              insetChildren={true}
                                              leftAvatar={<Avatar src={aProduct.pic}/>} //fixme
                                              rightAvatar={<IconButton><StarBorder color="lightBlue"/></IconButton>}
                                              onClick={this.redirect} //fixme
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

export default Products