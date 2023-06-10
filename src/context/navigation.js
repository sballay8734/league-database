import { createContext, useState, useEffect } from "react"

const NavigationContext = createContext()

function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [navIsShown, setNavIsShown] = useState(false)

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

  function handleNavClose() {
    setNavIsShown(false)
  }

  function handleNavClick() {
    setNavIsShown(!navIsShown)
  }

  function handleLinkClick(to) {
    navigate(to)
    setNavIsShown(false)
  }

  return (
    <NavigationContext.Provider
      value={{
        navigate,
        currentPath,
        navIsShown,
        handleNavClose,
        handleLinkClick,
        handleNavClick
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export { NavigationContext }
export { NavigationProvider }
