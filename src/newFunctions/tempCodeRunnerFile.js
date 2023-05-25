const API_URL = "http://127.0.0.1:3001/teamOwners"
const STATIC_DATA_API = "http://127.0.0.1:3001/staticData"

// // DATA FETCH
// async function dataFetch() {
//   const response = await fetch(API_URL, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })

//   const data = await response.json()
//   return data[0]
// }
// // FETCH TEST
// async function fetchTest() {
//   let testOwner = await dataFetch()

//   return avgPointsForAllTime(testOwner)
// }

// fetchTest()
// POINTS FOR ********************* POINTS FOR ********************** POINTS FOR

// Average PointsFor by year RegSzn
function avgPointsForRegSzn(owner, year) {
  // const totalGames = Object.keys(owner[year].regularSeason).length
  return null
}

// Average PointsFor by year Playoffs
function avgPointsForPlayoffs(owner, year) {
  return null
}

// Combined Average PointsFor by year (RegSzn AND Playoffs)
function combinedAvgPointsFor(owner, year) {
  return (
    (avgPointsForPlayoffs(owner, year) + avgPointsForRegSzn(owner, year)) / 2
  )
}

// Combined Average PointsFor All Time (RegSzn AND Playoffs)
function avgPointsForAllTime(owner) {
  let avgPointsForAllTime = 0

  const years = Object.keys(owner)

  for (let index = 0; index < years.length; index++) {
    const year = years[index]

    if (year === "id" || year === "ownerName") return
    if (owner[year].participated === false) return

    const totalGames = Object.keys(owner[year].regularSeason).length
    // get pointsForCombined for current year in loop, then add to total
    // avgPointsForAllTime += combinedAvgPointsFor(owner, year)

    // this log works when run with fetch test
    // console.log(owner[year].regularSeason)
    console.log(totalGames)
  }

  return avgPointsForAllTime
}

// DATA FETCH
async function dataFetch() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await response.json()
  return data[0]
}
// FETCH TEST
async function fetchTest() {
  let testOwner = await dataFetch()

  return avgPointsForAllTime(testOwner)
}

fetchTest()