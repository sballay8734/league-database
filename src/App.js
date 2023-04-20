import "./styles.css"
import { useEffect, useState } from "react"
import OwnerCard from "./components/OwnerCard/OwnerCard"

const API_URL = "http://127.0.0.1:3001/teamOwners"

function App() {
  const [owners, setOwners] = useState([])
  const yearsList = [
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022"
  ]

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

  // WORKING ON THESE **********************************************************
  // Mostly working, just need to add all owner data to check
  function kingOfTheHillLogic(year) {
    // TEMPORARY HARD CODE OF OWNER LIST FOR TESTING ****
    const ownerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // TEMPORARY HARD CODE OF OWNER LIST FOR TESTING ****
    let totalStrikes = 0
    let strikesPerWeek = 0
    // need some way to calculate strikes per week (DO NOT HARD-CODE)
    owners.forEach((owner) => {
      const keys = Object.keys(owner[year].regularSeason)
      totalStrikes = ownerList.length * 3 - 1
      strikesPerWeek = totalStrikes / keys.length
      console.log(strikesPerWeek)
      console.log(totalStrikes)

      // Might be easiest to say if (14gameSeason) else if (13gameSeason) etc...
    })

    // for each week, determine who gets strikes
    // how to determine who gets strikes?
  }
  // kingOfTheHillLogic("2014")

  function leagueAvgPointsPerWeek(owner, year, weekKey) {
    let ownerTotal = 0
    let weekTotalPoints = 0

    owners.forEach((item) => {
      // console.log(item[year].regularSeason[weekKey].pointsFor)
      ownerTotal += 1
      weekTotalPoints += item[year].regularSeason[weekKey].pointsFor
    })

    return { ownerTotal, weekTotalPoints }
  }
  // console.log(leagueAvgPointsPerWeek("Shawn Ballay", "2014", "weekOne"))

  // MISSING TIE BREAKER LOGIC
  function lastPlaceFinishes(year) {
    let currentLast = null
    owners.forEach((owner) => {
      if (currentLast === null || owner[year].wins < currentLast.wins) {
        currentLast = { owner: owner.ownerName, wins: owner[year].wins }
      } else if (currentLast.wins === owner[year].wins) {
        // this is where you need to put tiebreaker logic
      }
    })
    console.log(currentLast)
  }
  // lastPlaceFinishes("2019")

  // WORKING ON THESE **********************************************************
  return (
    <div className="App flex flex-wrap bg-white gap-2">
      {owners.map((owner) => {
        return <OwnerCard key={owner.id} owner={owner} />
      })}
    </div>
  )
}

export default App

// npm start
// npm run server
