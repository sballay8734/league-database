const API_URL = "http://127.0.0.1:3001/teamOwners"
const STATIC_DATA_API = "http://127.0.0.1:3001/staticData"

// POINTS FOR @@@@@@@@@@@@@@@@@@@@@ POINTS FOR @@@@@@@@@@@@@@@@@@@@@@ POINTS FOR

// NEED TO USE TOTAL GAMES TO FIND AVERAGE ALL TIME. YOU CANT ADD AVERAGES AND DIVIDE BY NUMBER OF AVERAGES!!!!!

// Average PointsFor RegSzn (yearly) **************************** @@@@ DONE @@@@
function avgPointsForRegSzn(owner, year) {
  if (!owner[year].participated) return false // return false for combined func

  const totalRegSznGames = Object.keys(owner[year].regularSeason).length
  const weekKeys = Object.keys(owner[year].regularSeason)
  let totalRegSznPoints = 0

  for (let i = 0; i < weekKeys.length; i++) {
    const week = weekKeys[i]
    totalRegSznPoints += owner[year].regularSeason[week].pointsFor
  }

  const avgRegSznPointsFor = (totalRegSznPoints / totalRegSznGames).toFixed(2)

  return {
    totalRegSznPoints,
    totalRegSznGames,
    avgRegSznPointsFor
  }
}

// Average PointsFor Playoffs (yearly) ************************** @@@@ DONE @@@@
function avgPointsForPlayoffs(owner, year) {
  if (!owner[year].participated) return false // return false for combined func

  if (!owner[year].playoffs.roundOne.participated) {
    return `Owner did not make the playoffs in ${year}`
  }

  const playoffKeys = Object.keys(owner[year].playoffs)
  let totalPlayoffGames = 0 // must increment because .length is insufficient
  let totalPlayoffPoints = 0

  for (let i = 0; i < playoffKeys.length; i++) {
    const round = playoffKeys[i]

    if (
      (owner[year].playoffs[round].participated &&
        owner[year].playoffs[round].bye === false) ||
      !owner[year].playoffs[round].bye
    ) {
      totalPlayoffGames++
      totalPlayoffPoints += owner[year].playoffs[round].pointsFor
    }
  }

  const avgPlayoffPointsFor = (totalPlayoffPoints / totalPlayoffGames).toFixed(
    2
  )

  return {
    totalPlayoffPoints,
    totalPlayoffGames,
    avgPlayoffPointsFor
  }
}

// Combined Average PointsFor (RegSzn AND Playoffs) (yearly) **** @@@@ DONE @@@@
function combinedAvgPointsFor(owner, year) {
  if (!avgPointsForRegSzn(owner, year)) return false
  if (!avgPointsForPlayoffs(owner, year)) return avgPointsForRegSzn(owner, year)

  const combinedTotalPoints =
    avgPointsForRegSzn(owner, year).totalRegSznPoints +
    avgPointsForPlayoffs(owner, year).totalPlayoffPoints

  const combinedTotalGames =
    avgPointsForRegSzn(owner, year).totalRegSznGames +
    avgPointsForPlayoffs(owner, year).totalPlayoffGames

  return (combinedTotalPoints / combinedTotalGames).toFixed(2)
}

// Average PointsFor RegSzn (All Time) *****************************************
function avgPointsForRegSznAllTime() {
  // NEED TO USE TOTAL NUMBER OF GAMES!
  return null
}

// Average PointsFor Playoffs (All Time) ***************************************
function avgPointsForPlayoffsAllTime() {
  // NEED TO USE TOTAL NUMBER OF GAMES!
  return null
}

// Combined Average PointsFor (RegSzn AND Playoffs) (All Time) *****************
function avgPointsForAllTime(owner) {
  let avgPointsForAllTime = 0

  const years = Object.keys(owner)

  for (let i = 0; i < years.length; i++) {
    const year = years[i]

    if (year === "id" || year === "ownerName") continue
    if (!owner[year].regularSeason) continue

    const totalRegSznGames = Object.keys(owner[year].regularSeason).length
    // get pointsForCombined for current year in loop, then add to total
    // avgPointsForAllTime += combinedAvgPointsFor(owner, year)

    console.log(totalRegSznGames)
  }
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

  // just replace this function with whatever one you want to test
  console.log("RegSzn", avgPointsForRegSzn(testOwner, "2020"))
  console.log("Playoffs", avgPointsForPlayoffs(testOwner, "2020"))
  console.log("Combined", combinedAvgPointsFor(testOwner, "2020"))
}

fetchTest()

// POINTS FOR @@@@@@@@@@@@@@@@@@@@@ POINTS FOR @@@@@@@@@@@@@@@@@@@@@@ POINTS FOR
