// returns YEARLY wins, losses, ties, and winning percentage
export function totalStatsBySeason(year, owner) {
  const keysArray = Object.keys(owner[year].regularSeason)
  let wins = 0
  let losses = 0
  let ties = 0

  keysArray.forEach((key) => {
    if (
      owner[year].regularSeason[key].pointsFor >
      owner[year].regularSeason[key].pointsAgainst
    ) {
      wins++
    } else if (
      owner[year].regularSeason[key].pointsFor <
      owner[year].regularSeason[key].pointsAgainst
    ) {
      losses++
    } else {
      ties++
    }
  })

  const winningPercentage = ((wins / (wins + losses + ties)) * 100).toFixed(2)

  return {
    wins,
    losses,
    ties,
    winningPercentage
  }
}

// return LIFETIME wins, losses, ties, and winning percentage
export function totalStats(owner) {
  let totalWins = 0
  let totalLosses = 0
  let totalTies = 0
  let winningPercentage = 0

  const yearKeys = Object.keys(owner)

  yearKeys.forEach((year) => {
    if (!owner[year].participated) return

    totalWins += totalStatsBySeason(year, owner).wins
    totalLosses += totalStatsBySeason(year, owner).losses
    totalTies += totalStatsBySeason(year, owner).ties
  })

  winningPercentage = (
    (totalWins / (totalWins + totalLosses + totalTies)) *
    100
  ).toFixed(1)

  return {
    totalWins,
    totalLosses,
    totalTies,
    winningPercentage
  }
}

// determine if owner made playoffs for a given year
export function playoffsMade(owner, year) {
  if (!owner[year].participated) return
  const playoffKey = owner[year].playoffs.roundOne

  let madePlayoffs = false

  if (playoffKey.participated === true) {
    madePlayoffs = true
  } else {
    madePlayoffs = false
  }
  return madePlayoffs
}

// calculate how many years owner has made playoffs
export function totalPlayoffAppearances(owner) {
  const keys = Object.keys(owner)
  let totalAppearances = 0
  keys.forEach((key) => {
    if (key === "id" || key === "ownerName") return

    if (playoffsMade(owner, key)) {
      totalAppearances++
    }
  })
  return totalAppearances
}

// calculate total years owner has been in league
export function totalYearsInLeague(owner) {
  let totalYears = 0
  const yearKeys = Object.keys(owner)
  yearKeys.forEach((key) => {
    if (key === "id" || key === "ownerName") return

    if (owner[key].participated) {
      totalYears++
    }
  })
  return totalYears
}

export function playOffStats(owner) {
  const totalYears = totalYearsInLeague(owner)
  const totalAppearances = totalPlayoffAppearances(owner)
  const playoffMakePercentage = totalAppearances / totalYears

  return { totalYears, totalAppearances, playoffMakePercentage }
}

export function finalsStats(owner) {
  let finalsAppearances = 0
  let finalsWins = 0
  let finalsLosses = 0
  const keys = Object.keys(owner)
  keys.forEach((key) => {
    if (key === "id" || key === "ownerName") return
    if (!owner[key].participated) return

    if (owner[key].playoffs.finalRound.participated) {
      if (
        owner[key].playoffs.finalRound.pointsFor >
        owner[key].playoffs.finalRound.pointsAgainst
      ) {
        finalsWins++
      } else {
        finalsLosses++
      }

      finalsAppearances++
    } else {
      return
    }
  })
  return { finalsAppearances, finalsWins, finalsLosses }
}

export function allTimeStats(owner) {
  let closeWins = 0
  let closeLosses = 0
  let totalPointsFor = 0

  let totalPointsOnWins = 0
  let totalPointsOnLosses = 0

  let totalPointsAgainst = 0
  let totalWeeks = 0

  let averagePointsFor = 0
  let averagePointsAgainst = 0

  const yearKeys = Object.keys(owner)
  yearKeys.forEach((year) => {
    if (year === "id" || year === "ownerName") return
    if (!owner[year].participated) return

    const matchupKeys = Object.keys(owner[year].regularSeason)
    matchupKeys.forEach((key) => {
      const ownerPoints = owner[year].regularSeason[key].pointsFor
      const opponentPoints = owner[year].regularSeason[key].pointsAgainst
      let closeGame = true

      const difference = ownerPoints - opponentPoints

      if (difference > 0 && difference <= 3) {
        closeWins++
      } else if (difference < 0 && difference >= -3) {
        closeLosses++
      } else {
        closeGame = false
      }

      if (difference > 0) {
        totalPointsOnWins += ownerPoints
      } else if (difference < 0) {
        totalPointsOnLosses += ownerPoints
      } else {
        // console.log("tie")
      }

      totalPointsFor += owner[year].regularSeason[key].pointsFor
      totalPointsAgainst += owner[year].regularSeason[key].pointsAgainst
      totalWeeks++
    })
  })

  averagePointsFor = (totalPointsFor / totalWeeks).toFixed(2)
  averagePointsAgainst = (totalPointsAgainst / totalWeeks).toFixed(2)
  const averagePointsPerWin = (
    totalPointsOnWins / totalStats(owner).totalWins
  ).toFixed(2)
  const averagePointsPerLoss = (
    totalPointsOnLosses / totalStats(owner).totalLosses
  ).toFixed(2)

  return {
    totalPointsFor,
    totalPointsAgainst,
    totalWeeks,
    closeWins,
    closeLosses,
    averagePointsAgainst,
    averagePointsFor,
    averagePointsPerLoss,
    averagePointsPerWin
  }

  // return AVG PF and PA at end as well
}
// AVERAGE MARGIN OF VICTORY/DEFEAT ??
// 69 counter

// NEED TO ADD ********************************
// last: true/false
// finished: 4
