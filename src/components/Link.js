import { NavigationContext } from "../context/navigation"
import { useContext } from "react"

function Link({ to, children }) {
  const { navigate } = useContext(NavigationContext)

  function handleClick(e) {
    e.preventDefault()
    console.log("Hello")

    navigate(to)
  }

  return (
    <a
      className="hover:text-white cursor-pointer"
      onClick={handleClick}
      href={to}
    >
      {children}
    </a>
  )
}

export default Link
