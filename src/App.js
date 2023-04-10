import "./styles.css"
import { useEffect, useState } from "react"
import OwnerCard from "./components/OwnerCard/OwnerCard"

const API_URL = "http://127.0.0.1:3001/teamOwners"

function App() {
  const [owners, setOwners] = useState([])

  useEffect(() => {
    dataFetch()
  }, [])

  async function dataFetch() {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setOwners(data)
  }
  return (
    <div className="App flex flex-wrap bg-blue-500 gap-2">
      {owners.map((owner) => {
        return <OwnerCard key={owner.id} owner={owner} />
      })}
    </div>
  )
}

export default App

// "regularSeason": {
//            "weekOne": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekTwo": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekThree": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekFour": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekFive": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekSix": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekSeven": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekEight": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekNine": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekTen": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekEleven": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekTwelve": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//            "weekThirteen": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" }
// },

// npm start
// npm run server
