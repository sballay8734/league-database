import useTheme from "../hooks/useTheme"
import poopEmoji3 from "../images/icons8-poop-96 (1).png"

function PoopPrank() {
  const { themeState } = useTheme()

  return (
    <div className="poop-prank">
      <img src={poopEmoji3} alt="prank" />
      {themeState.primary === "color-chelsea" && "Chelsea is DOG POO!"}
      {themeState.primary === "color-yankees" && "Yankees are DOG POO!"}
      {themeState.primary === "color-giants" && "Giants are DOG POO!"}
    </div>
  )
}

export default PoopPrank
