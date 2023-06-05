import "./compare.css"

function CompareView() {
  return (
    <div className="compare__container text-white">
      <div className="grid-left">
        <div className="owner-one"></div>
        <div className="owner-one-stats"></div>
      </div>
      <div className="grid-middle">
        <div className="middle-row h2h"></div>
        <div className="middle-row by-year"></div>
        <div className="middle-row all-time"></div>
      </div>
      <div className="grid-right">
        <div className="owner-two"></div>
        <div className="owner-two-stats"></div>
      </div>
    </div>
  )
}

export default CompareView
