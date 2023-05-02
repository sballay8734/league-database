import { NavigationContext } from "../context/navigation"
import { useContext } from "react"

function Link({ to, children }) {
  const { navigate } = useContext(NavigationContext)

  function handleClick(e) {
    e.preventDefault()

    navigate(to)
  }

  return (
    <a className="hover:text-white" onClick={handleClick} href={to}>
      {children}
    </a>
  )
}

export default Link
