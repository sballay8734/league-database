import "./records.css"

function RecordsView() {
  return (
    <div className="records__container text-white">
      <div className="section record-cards"></div>
      <div className="section record-overview">
        <div className="chart good-records"></div>
        <div className="chart bad-records"></div>
        <div className="section chart combined-chart"></div>
      </div>
    </div>
  )
}

export default RecordsView
