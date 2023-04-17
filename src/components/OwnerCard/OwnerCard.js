import { AiFillCaretDown } from "react-icons/ai"
import {
  totalStatsBySeason,
  totalStats,
  playOffStats,
  finalsStats,
  allTimeStats
} from "../../statFunctions/statFunction"
import "../../styles.css"

// On 2016 for donnie

function OwnerCard({ owner }) {
  // function luckyAndUnlucky(owner) {
  //   // for each week get average points of league
  // }

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
          <div className="stat text-xs">
            Average PP Win:{" "}
            <span>{allTimeStats(owner).averagePointsPerWin}</span>
          </div>
          <div className="stat text-xs">
            Average PP Loss:{" "}
            <span>{allTimeStats(owner).averagePointsPerLoss}</span>
          </div>
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
          <div className="stat text-xs">
            Close Wins: <span>{allTimeStats(owner).closeWins}</span>
          </div>
          <div className="stat text-xs">
            Close Losses: {allTimeStats(owner).closeLosses}
          </div>
          <div className="stat text-xs">Lucky Ws: </div>
          <div className="stat text-xs">Unlucky Ls: </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerCard
