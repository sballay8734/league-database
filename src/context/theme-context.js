import { createContext, useReducer, useEffect } from "react"
import { themeReducer } from "./themeReducer"

const ThemeContext = createContext()

const initialThemeState = { primary: "color-eagles" }

function ThemeProvider({ children }) {
  const [themeState, dispatchTheme] = useReducer(
    themeReducer,
    initialThemeState
  )

  function themeHandler(buttonClassName) {
    dispatchTheme({ type: buttonClassName })
  }

  console.log(themeState)

  return (
    <ThemeContext.Provider value={{ themeState, themeHandler }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }
export { ThemeProvider }
