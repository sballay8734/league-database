import { NavigationContext } from "../context/navigation"
import { useContext } from "react"

function SidebarLink({ to, children, className }) {
  const { navigate } = useContext(NavigationContext)

  function handleClick(e) {
    e.preventDefault()

    navigate(to)
  }

  return (
    <a
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
      href={to}
    >
      {children}
    </a>
  )
}

export default SidebarLink
