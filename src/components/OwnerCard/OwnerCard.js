import { AiFillCaretDown } from "react-icons/ai"
import { totalWinsBySeason } from "../../statFunctions/statFunction"
import "../../styles.css"

// On 2016 for donnie

function OwnerCard({ owner }) {
  function totalStats() {
    const seasonYears = [
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
    let totalWins = 0
    let totalLosses = 0
    let totalTies = 0
    let winningPercentage = 0

    seasonYears.forEach((year) => {
      if (!owner[year].participated) return

      totalWins += totalWinsBySeason(year, owner).wins
      totalLosses += totalWinsBySeason(year, owner).losses
      totalTies += totalWinsBySeason(year, owner).ties
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

  return (
    // Card
    <div className="font-montserrat card border-2 border-black w-96 h-56 bg-white flex justify-around items-center p-4 flex-col justify-between h-full rounded-xl bg-orange-100 shadow-lg">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="font-semibold">{owner.ownerName}</h1>
        <p className="font-medium text-xs text-slate-600">Seasons: 10</p>
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
        <div className="flex gap-2">
          <div>
            <p className="text-xs font-medium">Koth Victories: </p>
            <p className="text-xs text-slate-600">Playoff Apps: </p>
          </div>
          <div>
            <p className="text-xs font-medium">Championships: </p>
            <p className="text-xs text-muted text-slate-600">
              Winning Pct: {totalStats(owner).winningPercentage}%
            </p>
          </div>
        </div>
      </div>
      {/* Bulk Stats */}
      <div className="stats flex w-full items-center justify-between text-sm">
        <div className="flex flex-col min-h-full justify-around gap-4">
          <div className="stat text-xs">Average PF: </div>
          <div className="stat text-xs">Average PA: </div>
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
          <div className="stat text-xs">Finals Apps: </div>
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
