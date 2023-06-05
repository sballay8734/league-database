import "./styles.css"
import { useEffect, useState, useContext } from "react"
import useModal from "./hooks/useModal"
import HomeView from "./pages/HomeView"
import OwnerView from "./pages/OwnerView"
import CompareView from "./pages/CompareView"
import RecordsView from "./pages/RecordsView"
import KingOfTheHillView from "./pages/KingOfTheHillView"
import Route from "./components/Route"
import Navbar from "./components/Navbar/Navbar"
import Theme from "./theme/Theme"
import useTheme from "./hooks/useTheme"
import PoopPrank from "./components/PoopPrank"
import { connectToDB, getDB } from "./newFunctions/toDatabase"

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
  const { modalIsShown } = useModal()
  const { themeState } = useTheme()

  useEffect(() => {
    // connectToDB()  // can't do this from front-end
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
    <main className={`home ${themeState.primary}`}>
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
      {modalIsShown ? <Theme /> : ""}
      {themeState.primary === "color-chelsea" ||
      themeState.primary === "color-yankees" ||
      themeState.primary === "color-giants" ? (
        <PoopPrank />
      ) : (
        ""
      )}
    </main>
  )
}

export default App

// npm start
// npm run server
