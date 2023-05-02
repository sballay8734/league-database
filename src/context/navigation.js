import { useContext, createContext, useState, useEffect } from "react"

const NavigationContext = createContext()

function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    function handler() {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener("popstate", handler)

    return () => {
      window.removeEventListener("popstate", handler)
    }
  }, [])

  function navigate(to) {
    window.history.pushState({}, "", to)
    setCurrentPath(to)
  }

  return (
    <NavigationContext.Provider value={{ navigate, currentPath }}>
      {children}
    </NavigationContext.Provider>
  )
}

export { NavigationContext }
export { NavigationProvider }
