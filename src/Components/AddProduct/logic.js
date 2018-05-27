export const clearState = (self) =>
  self.setState({
    category: 'other',
    isFavorite: true,
    picture: '',
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fat: 0
  })

export const nameHandler = (self, stateProp, val) => (self.setState({ [stateProp]: val },))

export const pictureHandler = (self, stateProp, val) => (self.setState({ [stateProp]: val }))

export const nutrientsHandler = (self, stateProp, val) => {
  if (val % 1 === 0) {
    self.setState({ [stateProp]: val })
  }
}