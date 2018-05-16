export const addToDatabase = (self, db) => {
    self.state.products.filter(el =>
      el.name === self.state.name
    ).length ?
      self.clearState(alert(`${self.state.name} is already in base!`))
      :
      db.ref(`/products`)
        .push({
          name: self.state.name,
          category: self.state.category,
          isFavorite: self.state.isFavorite,
          picture: self.state.picture,
          kcal: self.state.calories,
          proteins: self.state.proteins,
          carbohydrates: self.state.carbohydrates,
          fat: self.state.fat
        }).then(self.clearState)
  }

export const clearState = (self, callback) =>
    self.setState({
      category: 'other',
      isFavorite: true,
      picture: '',
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fat: 0
    }, callback())

export const nameHandler = (self, stateProp, val) => (self.setState({ [stateProp]: val }))

export const pictureHandler = (self, stateProp, val) => (self.setState({ [stateProp]: val }))

export const nutrientsHandler = (self, stateProp, val) => {
    val % 1 === 0 ?
      self.setState({ [stateProp]: val })
      :
      alert('An integer is required in this field')
  }


