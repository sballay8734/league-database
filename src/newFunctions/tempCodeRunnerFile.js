const db = require("mongodb")
const API_URL = "http://127.0.0.1:3001/teamOwners"
const STATIC_DATA_API = "http://127.0.0.1:3001/staticData"

// Connect to DB
let dbConnection

async function connectToDB(callback) {
  try {
    const response = await db.connect(process.env.DB_URI)
    dbConnection = response.db()
    console.log("Connected")
    return callback()
  } catch (error) {
    console.log(error)
    return callback(error)
  }
}

function getDB() {
  return dbConnection
}

// POINTS FOR ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽ POINTS FOR ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽ POINTS FOR

// Average PF RegSzn (yearly) @@@@ DONE @@@@
function avgPointsForRegSzn(owner, year) {
  if (!owner[year].participated) return false // return false for combined func

  const totalRegSznGames = Object.keys(owner[year].regularSeason).length
  const weekKeys = Object.keys(owner[year].regularSeason)
  let totalRegSznPoints = 0

  for (let i = 0; i < weekKeys.length; i++) {
    const week = weekKeys[i]
    totalRegSznPoints += owner[year].regularSeason[week].pointsFor
  }

  const avgRegSznPointsFor = Number(
    (totalRegSznPoints / totalRegSznGames).toFixed(2)
  )

  // Fetch and replace
  async function findAndUpdate(owner, year) {
    const response = await fetch(
      `${STATIC_DATA_API}/${owner.id}?_embed=yearly`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    const result = await response.json()
    console.log(result)
  }

  findAndUpdate(owner, year)

  return {
    totalRegSznPoints,
    totalRegSznGames,
    avgRegSznPointsFor
  }
}

// Average PF Playoffs (yearly) @@@@ DONE @@@@
function avgPointsForPlayoffs(owner, year) {
  if (!owner[year].participated) return false // return false for combined func

  if (!owner[year].playoffs.roundOne.participated) {
    return `Owner did not make the playoffs in ${year}`
  }

  const playoffKeys = Object.keys(owner[year].playoffs)
  let totalPlayoffGames = 0
  let totalPlayoffPoints = 0
  let totalPlayoffByes = 0

  for (let i = 0; i < playoffKeys.length; i++) {
    const round = playoffKeys[i]

    if (!owner[year].playoffs[round].participated) continue
    if (owner[year].playoffs[round].bye === true) {
      totalPlayoffByes++
      continue
    }

    totalPlayoffGames++
    totalPlayoffPoints += owner[year].playoffs[round].pointsFor
  }

  const avgPlayoffPointsFor = Number(
    (totalPlayoffPoints / totalPlayoffGames).toFixed(2)
  )

  return {
    totalPlayoffPoints,
    totalPlayoffGames,
    totalPlayoffByes,
    avgPlayoffPointsFor
  }
}

// Combined Average PF (RegSzn AND Playoffs) (yearly) @@@@ DONE @@@@
function combinedAvgPointsFor(owner, year) {
  if (!avgPointsForRegSzn(owner, year)) return false
  if (!avgPointsForPlayoffs(owner, year)) return avgPointsForRegSzn(owner, year)

  const combinedTotalPoints =
    avgPointsForRegSzn(owner, year).totalRegSznPoints +
    avgPointsForPlayoffs(owner, year).totalPlayoffPoints

  const combinedTotalGames =
    avgPointsForRegSzn(owner, year).totalRegSznGames +
    avgPointsForPlayoffs(owner, year).totalPlayoffGames

  const combinedAvgPointsFor = Number(
    (combinedTotalPoints / combinedTotalGames).toFixed(2)
  )

  return {
    combinedTotalPoints,
    combinedTotalGames,
    combinedAvgPointsFor
  }
}

// Average PF RegSzn (All Time) @@@@ DONE @@@@
function avgPointsForRegSznAllTime(owner) {
  let totalPointsRegSzn = 0
  let totalGamesRegSzn = 0

  const years = Object.keys(owner)

  for (let i = 0; i < years.length; i++) {
    const year = years[i]

    if (year === "id" || year === "ownerName") continue
    if (!owner[year].regularSeason) continue

    totalPointsRegSzn += avgPointsForRegSzn(owner, year).totalRegSznPoints
    totalGamesRegSzn += avgPointsForRegSzn(owner, year).totalRegSznGames
  }

  const avgPointsForRegSznAllTime = Number(
    (totalPointsRegSzn / totalGamesRegSzn).toFixed(2)
  )

  return {
    totalPointsRegSzn,
    totalGamesRegSzn,
    avgPointsForRegSznAllTime
  }
}

// Average PF Playoffs (All Time) @@@@ DONE @@@@
function avgPointsForPlayoffsAllTime(owner) {
  let totalPointsPlayoffs = 0
  let totalGamesPlayoffs = 0
  let totalByes = 0

  const years = Object.keys(owner)

  for (let i = 0; i < years.length; i++) {
    const year = years[i]

    if (year === "id" || year === "ownerName") continue
    if (!owner[year].regularSeason) continue

    if (!avgPointsForPlayoffs(owner, year).totalPlayoffPoints) continue

    totalPointsPlayoffs += avgPointsForPlayoffs(owner, year).totalPlayoffPoints
    totalGamesPlayoffs += avgPointsForPlayoffs(owner, year).totalPlayoffGames
    totalByes += avgPointsForPlayoffs(owner, year).totalPlayoffByes
  }

  const avgPlayoffPointsAllTime = Number(
    (totalPointsPlayoffs / totalGamesPlayoffs).toFixed(2)
  )

  return {
    totalPointsPlayoffs,
    totalGamesPlayoffs,
    totalByes,
    avgPlayoffPointsAllTime
  }
}

// Combined Average PF (RegSzn AND Playoffs) (All Time) @@@@ DONE @@@@
function combinedAvgPointsForAllTime(owner) {
  let totalPointsAllTime = 0
  let totalGamesAllTime = 0

  const years = Object.keys(owner)

  for (let i = 0; i < years.length; i++) {
    const year = years[i]

    if (year === "id" || year === "ownerName") continue
    if (!owner[year].regularSeason) continue

    totalPointsAllTime += avgPointsForRegSzn(owner, year).totalRegSznPoints
    totalGamesAllTime += avgPointsForRegSzn(owner, year).totalRegSznGames

    if (!avgPointsForPlayoffs(owner, year).totalPlayoffPoints) continue

    totalPointsAllTime += avgPointsForPlayoffs(owner, year).totalPlayoffPoints
    totalGamesAllTime += avgPointsForPlayoffs(owner, year).totalPlayoffGames
  }
  const combinedAvgPointsFor = Number(
    (totalPointsAllTime / totalGamesAllTime).toFixed(2)
  )

  return {
    totalPointsAllTime,
    totalGamesAllTime,
    combinedAvgPointsFor
  }
}

// POINTS FOR △△△△△△△△△△△△△△△△△△△△△ POINTS FOR △△△△△△△△△△△△△△△△△△△△△△ POINTS FOR

// POINTS AGAINST ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽ POINTS AGAINST ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽ POINTS AGAINST

// NEW FUNCTIONS HERE

// POINTS AGAINST △△△△△△△△△△△△△△△ POINTS AGAINST △△△△△△△△△△△△△△△△ POINTS AGAINST

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
  console.log(testOwner.ownerName, avgPointsForRegSzn(testOwner, "2015"))
}

fetchTest()