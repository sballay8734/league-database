import "./styles.css"
import { useEffect, useState } from "react"
import { allTimeStats } from "./statFunctions/statFunction"
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

  return (
    <div className="App flex flex-wrap gap-4 bg-[#0B2447]">
      {owners.map((owner) => {
        return <OwnerCard key={owner.id} owner={owner} owners={owners} />
      })}
    </div>
  )
}

export default App

// npm start
// npm run server
