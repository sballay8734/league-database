import { AiFillCaretDown } from "react-icons/ai"
import {
  totalStatsBySeason,
  totalStats,
  playOffStats,
  finalsStats
} from "../../statFunctions/statFunction"
import "../../styles.css"

// On 2016 for donnie

function OwnerCard({ owner }) {
  // SOMETHING IS NOT RIGHT HERE, Stats are not correct
  function allTimeStats(owner) {
    let closeWins = 0
    let closeLosses = 0
    let totalPointsFor = 0
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

        totalPointsFor += owner[year].regularSeason[key].pointsFor
        totalPointsAgainst += owner[year].regularSeason[key].pointsAgainst
        totalWeeks++
        console.log(year, closeGame, owner[year].regularSeason[key].pointsFor)
      })
    })

    averagePointsFor = (totalPointsFor / totalWeeks).toFixed(2)
    averagePointsAgainst = (totalPointsAgainst / totalWeeks).toFixed(2)

    return {
      totalPointsFor,
      totalPointsAgainst,
      totalWeeks,
      closeWins,
      closeLosses,
      averagePointsAgainst,
      averagePointsFor
    }

    // return AVG PF and PA at end as well
  }

  return (
    // Card
    <div className="font-montserrat card border-2 border-black w-96 h-56 bg-white flex justify-around items-center p-4 flex-col justify-between h-full rounded-xl bg-orange-100 shadow-lg">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="font-semibold">{owner.ownerName}</h1>
        <p className="font-medium text-xs text-slate-600">
          Seasons:{" "}
          <span className="font-semibold">
            {playOffStats(owner).totalYears}
          </span>
        </p>
        <div className="button-wrapper flex">
          <button className="font-medium text-xs border-r-0 border-2 border-blue-900 px-2 py-[2px] hover:bg-blue-900 hover:text-white rounded-l">
            All-Time
          </button>
          <button className="font-medium text-xs border-2 border-blue-900 px-2 py-[2px] hover:bg-blue-900 hover:text-white rounded-r flex items-center gap-1">
            2023 <span>{<AiFillCaretDown />}</span>
          </button>
        </div>
      </div>
      {/* Featured Stats */}
      <div className="main-stats flex w-full items-center py-4 gap-4">
        <div className="border-2 border-black p-6 rounded-full relative"></div>
        <div className="flex gap-6">
          <div>
            <p className="text-xs font-medium">Koth Victories: </p>
            <p className="text-xs text-slate-600">
              Playoff Apps:{" "}
              <span className="font-semibold">
                {playOffStats(owner).totalAppearances}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">
              Championships: <span>{finalsStats(owner).finalsWins}</span>
            </p>
            <p className="text-xs text-muted text-slate-600">
              Winning Pct:{" "}
              <span className="font-semibold">
                {totalStats(owner).winningPercentage}
              </span>
              %
            </p>
          </div>
        </div>
      </div>
      {/* Bulk Stats */}
      <div className="stats flex w-full items-center justify-between text-sm">
        <div className="flex flex-col min-h-full justify-around gap-4">
          <div className="stat text-xs">
            Average PF: <span>{allTimeStats(owner).averagePointsFor}</span>
          </div>
          <div className="stat text-xs">
            Average PA: <span>{allTimeStats(owner).averagePointsAgainst}</span>{" "}
          </div>
          <div className="stat text-xs">Average PP Win: </div>
          <div className="stat text-xs">Average PP Loss: </div>
        </div>
        <div className="flex flex-col min-h-full justify-around gap-4">
          <div className="stat text-xs">
            Wins: {totalStats(owner).totalWins}
          </div>
          <div className="stat text-xs">
            Losses: {totalStats(owner).totalLosses}
          </div>
          <div className="stat text-xs">Last: </div>
          <div className="stat text-xs">
            Finals Apps: <span>{finalsStats(owner).finalsAppearances}</span>
          </div>
        </div>
        <div className="flex flex-col min-h-full justify-around gap-4">
          <div className="stat text-xs">Close Wins: </div>
          <div className="stat text-xs">Close Losses: </div>
          <div className="stat text-xs">Lucky Ws: </div>
          <div className="stat text-xs">Unlucky Ls: </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerCard
