function OwnerCard({ owner }) {
  // Change name of function since it now returns 4 things
  function totalWinsBySeason(year) {
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

  return (
    <div className="card border-2 border-black w-96 h-56 bg-white flex justify-around items-center p-2">
      <div className="flex flex-col min-h-full justify-around">
        <div className="stat">wins: {totalWinsBySeason("2014").wins}</div>
        <div className="stat">losses: {totalWinsBySeason("2014").losses}</div>
        <div className="stat">
          Win Pct.: {totalWinsBySeason("2014").winningPercentage}%
        </div>
        <div className="stat">asdga</div>
      </div>
      <div className="flex flex-col min-h-full justify-around">
        <div className="stat">asdfa</div>
        <div className="stat">sdfasd</div>
        <div className="stat">sdfasd</div>
        <div className="stat">sdfasd</div>
      </div>
      <div className="flex flex-col min-h-full justify-around">
        <div className="stat">fasdfa</div>
        <div className="stat">fasdfa</div>
        <div className="stat">fasdfa</div>
        <div className="stat">fasdfa</div>
      </div>
      <div className="flex flex-col min-h-full justify-around">
        <div className="stat">asdfasd</div>
        <div className="stat">asdfasd</div>
        <div className="stat">asdfasd</div>
        <div className="stat">asdfasd</div>
      </div>
    </div>
  )
}

export default OwnerCard
