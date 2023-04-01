import "./styles.css"

const API_URL = "http://127.0.0.1:3001/teamOwners"

function App() {
  async function dataFetch() {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    const dataToReturn = data.map((item) => {
      const ownerName = item.ownerName
      return {
        ownerName,
        wins2014: item[2014].wins
      }
    })
    console.log(dataToReturn)
  }
  return (
    <div className="App">
      <button onClick={dataFetch} className="fetch">
        Fetch Data
      </button>
    </div>
  )
}

export default App

// "regularSeason": {
//   "weekOne": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekTwo": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekThree": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekFour": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekFive": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekSix": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekSeven": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekEight": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekNine": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekTen": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekEleven": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekTwelve": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" },
//   "weekThirteen": { "pointsFor": 000, "pointsAgainst": 000, "opponent": "xxxx" }
// },

// npm start
// npm run server
