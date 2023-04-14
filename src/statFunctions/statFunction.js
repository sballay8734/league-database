export function totalWinsBySeason(year, owner) {
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
