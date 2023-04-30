import { AiFillCaretDown } from "react-icons/ai"
import { AiTwotoneTrophy } from "react-icons/ai"
import {
  totalStatsBySeason,
  totalStats,
  playOffStats,
  finalsStats,
  allTimeStats,
  averagePlacement
} from "../../statFunctions/statFunction"
import "../../styles.css"
import logo from "../../images/profileImg.png"

// "leading" tailwind property messing with spacing in "Featured Stats"

// Include playoffs in these stats (Most/least points in a week, highest/lowest combined total, winning streak, etc...)

// Add playoff Tab to bulk stats

function OwnerCard({ owner, owners }) {
  // Avg Points For, Points Against, PP Win, PP Loss
  function leagueAverageStats(owners) {
    let pointsFor = []
    let pointsAgainst = []
    let pointsPerWin = []
    let pointsPerLoss = []

    owners.forEach((owner) => {
      pointsFor.push(allTimeStats(owner).averagePointsFor)
      pointsAgainst.push(allTimeStats(owner).averagePointsAgainst)
      pointsPerWin.push(allTimeStats(owner).averagePointsPerWin)
      pointsPerLoss.push(allTimeStats(owner).averagePointsPerLoss)
    })

    function findAvg(stat) {
      let total = 0
      stat.forEach((item) => {
        total += Number(item)
      })
      return (total / stat.length).toFixed(2)
    }

    const leagueAveragePointsFor = findAvg(pointsFor)
    const leagueAveragePointsAgainst = findAvg(pointsAgainst)
    const leagueAvgPointsPerWin = findAvg(pointsPerWin)
    const leagueAvgPointsPerLoss = findAvg(pointsPerLoss)

    return {
      leagueAveragePointsFor,
      leagueAveragePointsAgainst,
      leagueAvgPointsPerWin,
      leagueAvgPointsPerLoss
    }
  }

  // Avg Finish, Last Count, Playoff Apps, Finals Apps, Finals Wins
  function leagueAverageStats2(owners) {
    let avgFinishes = []
    let lastCounts = []
    let playoffApps = []
    let finalsApps = []
    let finalsWins = []

    owners.forEach((owner) => {
      avgFinishes.push(averagePlacement(owner).avgPlacement)
      lastCounts.push(averagePlacement(owner).lastCount)
      playoffApps.push(playOffStats(owner).totalAppearances)
      finalsApps.push(finalsStats(owner).finalsAppearances)
      finalsWins.push(finalsStats(owner).finalsWins)
    })

    function findAvg(stat) {
      let total = 0
      stat.forEach((item) => {
        total += Number(item)
      })
      return (total / stat.length).toFixed(1)
    }

    const leagueAvgFinish = findAvg(avgFinishes)
    const leagueAvgLast = findAvg(lastCounts)
    const leagueAvgPlayoffApps = findAvg(playoffApps)
    const leagueAvgFinalsApps = findAvg(finalsApps)
    const leagueAvgFinalsWins = findAvg(finalsWins)

    return {
      leagueAvgFinish,
      leagueAvgLast,
      leagueAvgPlayoffApps,
      leagueAvgFinalsApps,
      leagueAvgFinalsWins
    }
  }

  // Wins, losses, win%, Close Wins, Close Losses
  function leagueAverageStats3(owners) {
    let wins = []
    let losses = []
    let winPct = []
    let closeWins = []
    let closeLosses = []
    let luckyWins = []
    let unluckyLosses = []

    owners.forEach((owner) => {
      wins.push(totalStats(owner).totalWins)
      losses.push(totalStats(owner).totalLosses)
      winPct.push(totalStats(owner).winningPercentage)
      closeWins.push(allTimeStats(owner).closeWins)
      closeLosses.push(allTimeStats(owner).closeLosses)
      luckyWins.push(luckyAndUnlucky(owner).luckyWins)
      unluckyLosses.push(luckyAndUnlucky(owner).unluckyLosses)
    })

    function findAvg(stat) {
      let total = 0
      stat.forEach((item) => {
        total += Number(item)
      })
      return (total / stat.length).toFixed(1)
    }

    const leagueAvgWins = findAvg(wins)
    const leagueAvgLosses = findAvg(losses)
    const leagueAvgWinPct = findAvg(winPct)
    const leagueAvgCloseWins = findAvg(closeWins)
    const leagueAvgCloseLosses = findAvg(closeLosses)
    const leagueAvgLuckyWins = findAvg(luckyWins)
    const leagueAvgUnluckyLosses = findAvg(unluckyLosses)

    return {
      leagueAvgWins,
      leagueAvgLosses,
      leagueAvgWinPct,
      leagueAvgCloseLosses,
      leagueAvgCloseWins,
      leagueAvgLuckyWins,
      leagueAvgUnluckyLosses
    }
  }

  function leagueAvgPointsPerWeek(year, week) {
    let weekPoints = []

    owners.forEach((owner) => {
      if (owner[year].participated) {
        weekPoints.push(owner[year].regularSeason[week].pointsFor)
      } else {
        return
      }
    })

    function findAvg(stat) {
      let total = 0
      stat.forEach((item) => {
        total += Number(item)
      })
      return (total / stat.length).toFixed(2)
    }
    const avgPoints = findAvg(weekPoints)

    return { avgPoints }
  }

  function luckyAndUnlucky(owner) {
    let luckyWins = 0
    let unluckyLosses = 0

    const yearKeys = Object.keys(owner)
    yearKeys.forEach((year) => {
      if (owner[year].regularSeason) {
        const weekKeys = Object.keys(owner[year].regularSeason)
        weekKeys.forEach((week) => {
          if (!owner[year].participated) return

          if (
            owner[year].regularSeason[week].pointsFor >
              owner[year].regularSeason[week].pointsAgainst &&
            owner[year].regularSeason[week].pointsFor <
              leagueAvgPointsPerWeek(year, week).avgPoints
          ) {
            luckyWins++
          }

          if (
            owner[year].regularSeason[week].pointsFor <
              owner[year].regularSeason[week].pointsAgainst &&
            owner[year].regularSeason[week].pointsFor >
              leagueAvgPointsPerWeek(year, week).avgPoints
          ) {
            unluckyLosses++
          }
        })
      }
    })
    return { luckyWins, unluckyLosses }
  }

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
              <p className="text-base font-medium">
                Avg. Finish:{" "}
                <span className="font-semibold">
                  {averagePlacement(owner).avgPlacement}
                </span>
              </p>
              <div className="text-[.6rem] leading-[4px] italic flex justify-between py-[1px] w-10/12">
                <p className="text-slate-600">
                  Lg Avg:{" "}
                  <span className="font-semibold">
                    {leagueAverageStats2(owners).leagueAvgFinish}
                  </span>
                </p>
                <p className="text-green-700">
                  {averagePlacement(owner).avgPlacement -
                    leagueAverageStats2(owners).leagueAvgFinish <
                  0 ? (
                    <span className="font-semibold text-green-700">
                      {(
                        averagePlacement(owner).avgPlacement -
                        leagueAverageStats2(owners).leagueAvgFinish
                      ).toFixed(1)}
                    </span>
                  ) : (
                    <span className="font-semibold text-red-700">
                      +
                      {(
                        averagePlacement(owner).avgPlacement -
                        leagueAverageStats2(owners).leagueAvgFinish
                      ).toFixed(1)}
                    </span>
                  )}
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
                  Lg Avg:{" "}
                  <span className="font-semibold">
                    {leagueAverageStats2(owners).leagueAvgPlayoffApps}
                  </span>
                </p>
                <p className="text-green-700">
                  {playOffStats(owner).totalAppearances >
                  leagueAverageStats2(owners).leagueAvgPlayoffApps ? (
                    <span className="font-semibold text-green-700">
                      +
                      {(
                        playOffStats(owner).totalAppearances -
                        leagueAverageStats2(owners).leagueAvgPlayoffApps
                      ).toFixed(1)}
                    </span>
                  ) : (
                    <span className="font-semibold text-red-700">
                      {(
                        playOffStats(owner).totalAppearances -
                        leagueAverageStats2(owners).leagueAvgPlayoffApps
                      ).toFixed(1)}
                    </span>
                  )}
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
                  Lg Avg:{" "}
                  <span className="font-semibold">
                    {leagueAverageStats2(owners).leagueAvgFinalsWins}
                  </span>
                </p>
                <p className="text-green-700">
                  {finalsStats(owner).finalsWins >
                  leagueAverageStats2(owners).leagueAvgFinalsWins ? (
                    <span className="font-semibold text-green-700">
                      +
                      {(
                        finalsStats(owner).finalsWins -
                        leagueAverageStats2(owners).leagueAvgFinalsWins
                      ).toFixed(1)}
                    </span>
                  ) : (
                    <span className="font-semibold text-red-700">
                      {(
                        finalsStats(owner).finalsWins -
                        leagueAverageStats2(owners).leagueAvgFinalsWins
                      ).toFixed(1)}
                    </span>
                  )}
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
                  Lg Avg:{" "}
                  <span className="font-semibold">
                    {leagueAverageStats3(owners).leagueAvgWinPct}%
                  </span>
                </p>
                <p className="text-green-700">
                  {totalStats(owner).winningPercentage >
                  leagueAverageStats3(owners).leagueAvgWinPct ? (
                    <span className="font-semibold text-green-700">
                      +
                      {(
                        totalStats(owner).winningPercentage -
                        leagueAverageStats3(owners).leagueAvgWinPct
                      ).toFixed(1)}
                      %
                    </span>
                  ) : (
                    <span className="font-semibold text-red-700">
                      {(
                        totalStats(owner).winningPercentage -
                        leagueAverageStats3(owners).leagueAvgWinPct
                      ).toFixed(1)}
                      %
                    </span>
                  )}
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
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats(owners).leagueAveragePointsFor}
                </span>
              </p>
              <p className="text-green-700">
                {allTimeStats(owner).averagePointsFor >
                leagueAverageStats(owners).leagueAveragePointsFor ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      allTimeStats(owner).averagePointsFor -
                      leagueAverageStats(owners).leagueAveragePointsFor
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      allTimeStats(owner).averagePointsFor -
                      leagueAverageStats(owners).leagueAveragePointsFor
                    ).toFixed(1)}
                  </span>
                )}
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
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats(owners).leagueAveragePointsAgainst}
                </span>
              </p>
              <p>
                {allTimeStats(owner).averagePointsAgainst >
                leagueAverageStats(owners).leagueAveragePointsAgainst ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      allTimeStats(owner).averagePointsAgainst -
                      leagueAverageStats(owners).leagueAveragePointsAgainst
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      allTimeStats(owner).averagePointsAgainst -
                      leagueAverageStats(owners).leagueAveragePointsAgainst
                    ).toFixed(1)}
                  </span>
                )}
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
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats(owners).leagueAvgPointsPerWin}
                </span>
              </p>
              <p>
                {allTimeStats(owner).averagePointsPerWin >
                leagueAverageStats(owners).leagueAvgPointsPerWin ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      allTimeStats(owner).averagePointsPerWin -
                      leagueAverageStats(owners).leagueAvgPointsPerWin
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      allTimeStats(owner).averagePointsPerWin -
                      leagueAverageStats(owners).leagueAvgPointsPerWin
                    ).toFixed(1)}
                  </span>
                )}
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
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats(owners).leagueAvgPointsPerLoss}
                </span>
              </p>
              <p>
                {allTimeStats(owner).averagePointsPerLoss >
                leagueAverageStats(owners).leagueAvgPointsPerLoss ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      allTimeStats(owner).averagePointsPerLoss -
                      leagueAverageStats(owners).leagueAvgPointsPerLoss
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      allTimeStats(owner).averagePointsPerLoss -
                      leagueAverageStats(owners).leagueAvgPointsPerLoss
                    ).toFixed(1)}
                  </span>
                )}
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
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-12/12">
              <p className="text-slate-600">
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats3(owners).leagueAvgWins}
                </span>
              </p>
              <p>
                {totalStats(owner).totalWins >
                leagueAverageStats3(owners).leagueAvgWins ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      totalStats(owner).totalWins -
                      leagueAverageStats3(owners).leagueAvgWins
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      totalStats(owner).totalWins -
                      leagueAverageStats3(owners).leagueAvgWins
                    ).toFixed(1)}
                  </span>
                )}
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
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-12/12">
              <p className="text-slate-600">
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats3(owners).leagueAvgLosses}
                </span>
              </p>
              <p>
                {totalStats(owner).totalLosses >
                leagueAverageStats3(owners).leagueAvgLosses ? (
                  <span className="font-semibold text-red-700">
                    +
                    {(
                      totalStats(owner).totalLosses -
                      leagueAverageStats3(owners).leagueAvgLosses
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-green-700">
                    {(
                      totalStats(owner).totalLosses -
                      leagueAverageStats3(owners).leagueAvgLosses
                    ).toFixed(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Last:{" "}
              <span className="font-semibold">
                {averagePlacement(owner).lastCount}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-12/12">
              <p className="text-slate-600">
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats2(owners).leagueAvgLast}
                </span>
              </p>
              <p>
                {averagePlacement(owner).lastCount >
                leagueAverageStats2(owners).leagueAvgLast ? (
                  <span className="font-semibold text-red-700">
                    +
                    {(
                      averagePlacement(owner).lastCount -
                      leagueAverageStats2(owners).leagueAvgLast
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-green-700">
                    {(
                      averagePlacement(owner).lastCount -
                      leagueAverageStats2(owners).leagueAvgLast
                    ).toFixed(1)}
                  </span>
                )}
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
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-12/12">
              <p className="text-slate-600">
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats2(owners).leagueAvgFinalsApps}
                </span>
              </p>
              <p>
                {finalsStats(owner).finalsAppearances >
                leagueAverageStats2(owners).leagueAvgFinalsApps ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      finalsStats(owner).finalsAppearances -
                      leagueAverageStats2(owners).leagueAvgFinalsApps
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      finalsStats(owner).finalsAppearances -
                      leagueAverageStats2(owners).leagueAvgFinalsApps
                    ).toFixed(1)}
                  </span>
                )}
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
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats3(owners).leagueAvgCloseWins}
                </span>
              </p>
              <p>
                {allTimeStats(owner).closeWins >
                leagueAverageStats3(owners).leagueAvgCloseWins ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      allTimeStats(owner).closeWins -
                      leagueAverageStats3(owners).leagueAvgCloseWins
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      allTimeStats(owner).closeWins -
                      leagueAverageStats3(owners).leagueAvgCloseWins
                    ).toFixed(1)}
                  </span>
                )}
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
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats3(owners).leagueAvgCloseLosses}
                </span>
              </p>
              <p>
                {allTimeStats(owner).closeLosses >
                leagueAverageStats3(owners).leagueAvgCloseLosses ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      allTimeStats(owner).closeLosses -
                      leagueAverageStats3(owners).leagueAvgCloseLosses
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      allTimeStats(owner).closeLosses -
                      leagueAverageStats3(owners).leagueAvgCloseLosses
                    ).toFixed(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Lucky Ws:{" "}
              <span className="font-semibold">
                {luckyAndUnlucky(owner).luckyWins}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats3(owners).leagueAvgLuckyWins}
                </span>
              </p>
              <p>
                {luckyAndUnlucky(owner).luckyWins >
                leagueAverageStats3(owners).leagueAvgLuckyWins ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      luckyAndUnlucky(owner).luckyWins -
                      leagueAverageStats3(owners).leagueAvgLuckyWins
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      luckyAndUnlucky(owner).luckyWins -
                      leagueAverageStats3(owners).leagueAvgLuckyWins
                    ).toFixed(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div className="stat text-sm">
              Unlucky Ls:{" "}
              <span className="font-semibold">
                {luckyAndUnlucky(owner).unluckyLosses}
              </span>
            </div>
            <div className="text-[.6rem] leading-[8px] italic flex justify-between bg-slate-100 py-[1px] w-10/12">
              <p className="text-slate-600">
                Lg Avg:{" "}
                <span className="font-semibold">
                  {leagueAverageStats3(owners).leagueAvgUnluckyLosses}
                </span>
              </p>
              <p>
                {luckyAndUnlucky(owner).unluckyLosses >
                leagueAverageStats3(owners).leagueAvgUnluckyLosses ? (
                  <span className="font-semibold text-green-700">
                    +
                    {(
                      luckyAndUnlucky(owner).unluckyLosses -
                      leagueAverageStats3(owners).leagueAvgUnluckyLosses
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span className="font-semibold text-red-700">
                    {(
                      luckyAndUnlucky(owner).unluckyLosses -
                      leagueAverageStats3(owners).leagueAvgUnluckyLosses
                    ).toFixed(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerCard
