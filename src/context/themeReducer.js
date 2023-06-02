function themeReducer(state, action) {
  if (action.type === "color-eagles") {
    return { ...state, primary: "color-eagles" }
  }
  if (action.type === "color-union") {
    return { ...state, primary: "color-union" }
  }
  if (action.type === "color-liverpool") {
    return { ...state, primary: "color-liverpool" }
  }
  if (action.type === "color-chelsea") {
    return { ...state, primary: "color-chelsea" }
  }
  if (action.type === "color-yankees") {
    return { ...state, primary: "color-yankees" }
  }
  if (action.type === "color-giants") {
    return { ...state, primary: "color-giants" }
  }
}

export { themeReducer }
