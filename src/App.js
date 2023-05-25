import "./styles.css"
import { useEffect, useState } from "react"
import HomeView from "./pages/HomeView"
import OwnerView from "./pages/OwnerView"
import CompareView from "./pages/CompareView"
import RecordsView from "./pages/RecordsView"
import KingOfTheHillView from "./pages/KingOfTheHillView"
import Route from "./components/Route"
import Navbar from "./components/Navbar/Navbar"

const API_URL = "http://127.0.0.1:3001/teamOwners"
const STATIC_DATA_API = "http://127.0.0.1:3001/staticData"

// THIS WORKS!!! You can use this file for both operations for now. Migrate to MongoDB afterwards
async function staticDataFetch() {
  const response = await fetch(STATIC_DATA_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  console.log(data)
}
// staticDataFetch()

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

  // WORKING ON THESE **********************************************************
  // Mostly working, just need to add all owner data to check
  // function kingOfTheHillLogic(year) {
  //   // TEMPORARY HARD CODE OF OWNER LIST FOR TESTING ****
  //   const ownerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   // TEMPORARY HARD CODE OF OWNER LIST FOR TESTING ****
  //   let totalStrikes = 0
  //   let strikesPerWeek = 0
  //   // need some way to calculate strikes per week (DO NOT HARD-CODE)
  //   owners.forEach((owner) => {
  //     const keys = Object.keys(owner[year].regularSeason)
  //     totalStrikes = ownerList.length * 3 - 1
  //     strikesPerWeek = totalStrikes / keys.length
  //     console.log(strikesPerWeek)
  //     console.log(totalStrikes)

  //     // Might be easiest to say if (14gameSeason) else if (13gameSeason) etc...
  //   })

  //   // for each week, determine who gets strikes
  //   // how to determine who gets strikes?
  // }

  return (
    <div className="home">
      <Navbar />
      {/* Routes */}
      <div className="routes">
        <Route path="/">
          <HomeView />
        </Route>
        <Route path="/owners">
          <OwnerView owners={owners} />
        </Route>
        <Route path="/compare">
          <CompareView />
        </Route>
        <Route path="/records">
          <RecordsView />
        </Route>
        <Route path="/kingofthehill">
          <KingOfTheHillView />
        </Route>
      </div>
    </div>
  )
}

export default App

// npm start
// npm run server
