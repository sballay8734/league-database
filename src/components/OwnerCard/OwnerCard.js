import { AiFillCaretDown } from "react-icons/ai"
import { AiTwotoneTrophy } from "react-icons/ai"
import {
  totalStatsBySeason,
  totalStats,
  playOffStats,
  finalsStats,
  allTimeStats
} from "../../statFunctions/statFunction"
import "../../styles.css"
import logo from "../../images/profileImg.png"

// "leading" tailwind property messing with spacing in "Featured Stats"
// Include playoffs in these stats (Most/least points in a week, highest/lowest combined total, winning streak, etc...)

function OwnerCard({ owner }) {
  // function luckyAndUnlucky(owner) {
  //   // for each week get average points of league
  // }

  return (
    // Card
    <div className="font-montserrat card w-[28rem] h-56 flex justify-around items-center pb-4 flex-col justify-between h-full rounded-xl bg-white overflow-hidden">
      {/* Header */}
      <div className="flex w-full items-center justify-between py-3 px-4 text-xl bg-blue-200">
        <h1 className="font-semibold">{owner.ownerName}</h1>
        <p className="font-medium text-xs text-black bg-amber-300 py-1 rounded px-1 shadow-md">
          Seasons:{" "}
          <span className="font-bold">{playOffStats(owner).totalYears}</span>
        </p>
        <div className="button-wrapper flex">
          <button className="font-semibold text-base border-r-0 border-2 border-blue-900 px-2 py-[2px] bg-blue-900 text-white hover:bg-blue-900 hover:text-white rounded-l">
            All-Time
          </button>
          <button className="font-semibold text-base border-2 border-blue-900 px-2 py-[2px] hover:bg-blue-900 hover:text-white rounded-r flex items-center gap-1">
            2023 <span>{<AiFillCaretDown />}</span>
          </button>
        </div>
      </div>
      {/* Featured Stats */}
      <div className="main-stats flex w-full items-center gap-8 px-4 py-2 bg-slate-100">
        <div className="border-4 border-slate-700 rounded-full relative">
          <img className="h-16" src={logo} alt="profile"></img>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-base font-medium">Koth Victories: </p>
              <div className="text-[.6rem] leading-[4px] italic flex justify-between py-[1px] w-10/12">
                <p className="text-slate-600">
                  Lg Avg: <span className="font-semibold">115.2</span>
                </p>
                <p className="text-green-700">
                  <span className="text-green-700 font-semibold">+9.8</span>
                </p>
              </div>
            </div>
            <div>
              <p className="text-[.8rem] text-slate-600">
                Playoff Apps:{" "}
                <span className="font-bold">
                  {playOffStats(owner).totalAppearances}
                </span>
              </p>
              <div className="text-[.6rem] leading-[4px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
                <p className="text-slate-600">
                  Lg Avg: <span className="font-semibold">115.2</span>
                </p>
                <p className="text-green-700">
                  <span className="text-green-700 font-semibold">+9.8</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-base font-medium">
                Championships:{" "}
                <span className="font-bold">
                  {finalsStats(owner).finalsWins}
                </span>
              </p>
              <div className="text-[.6rem] leading-[4px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
                <p className="text-slate-600">
                  Lg Avg: <span className="font-semibold">115.2</span>
                </p>
                <p className="text-green-700">
                  <span className="text-green-700 font-semibold">+9.8</span>
                </p>
              </div>
            </div>
            <div>
              <p className="text-[.8rem] text-muted text-slate-600">
                Winning Pct:{" "}
                <span className="font-bold">
                  {totalStats(owner).winningPercentage}
                </span>
                %
              </p>
              <div className="text-[.6rem] leading-[4px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
                <p className="text-slate-600">
                  Lg Avg: <span className="font-semibold">115.2</span>
                </p>
                <p className="text-green-700">
                  <span className="text-green-700 font-semibold">+9.8%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Stats */}
      <div className="stats flex w-full items-center justify-between text-sm px-4 pt-2">
        <div className="flex flex-col min-h-full justify-around gap-2">
          <div>
            <div className="stat text-sm">
              Avg. PF:{" "}
              <span className="font-semibold">
                {allTimeStats(owner).averagePointsFor}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">115.2</span>
              </p>
              <p className="text-green-700">
                <span className="text-green-700 font-semibold">+9.8</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Avg. PA:{" "}
              <span className="font-semibold">
                {allTimeStats(owner).averagePointsAgainst}
              </span>{" "}
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Avg. PP Win:{" "}
              <span className="font-semibold">
                {allTimeStats(owner).averagePointsPerWin}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Avg. PP Loss:{" "}
              <span className="font-semibold">
                {allTimeStats(owner).averagePointsPerLoss}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="border border-black rounded-full h-28"></div>
        <div className="flex flex-col min-h-full justify-around gap-2">
          <div>
            <div className="stat text-sm">
              Wins:{" "}
              <span className="font-semibold">
                {totalStats(owner).totalWins}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Losses:{" "}
              <span className="font-semibold">
                {totalStats(owner).totalLosses}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Last: <span className="font-semibold"></span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Finals Apps:{" "}
              <span className="font-semibold">
                {finalsStats(owner).finalsAppearances}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="border border-black rounded-full h-28"></div>
        <div className="flex flex-col min-h-full justify-around gap-2">
          <div>
            <div className="stat text-sm">
              Close Wins:{" "}
              <span className="font-semibold">
                {allTimeStats(owner).closeWins}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Close Losses:{" "}
              <span className="font-semibold">
                {allTimeStats(owner).closeLosses}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Lucky Ws: <span className="font-semibold"></span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Unlucky Ls: <span className="font-semibold"></span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg: <span className="font-semibold">111.2</span>
              </p>
              <p>
                <span className="text-red-700 font-semibold">-2.3</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerCard
