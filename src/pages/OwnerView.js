import OwnerCard from "../components/OwnerCard/OwnerCard"
import "./owner-view.css"

function OwnerView({ owners }) {
  return (
    <div className="owners__container">
      <div className="column grid-left"></div>
      <div className="grid-middle">
        <div className="middle-row h2h"></div>
        <div className="middle-row by-year"></div>
        <div className="middle-row all-time"></div>
      </div>
      <div className="column grid-right"></div>
    </div>
    // OLD PAGE
    // <div className="App flex flex-wrap gap-4 bg-[#0B2447]">
    //   {owners.map((owner) => {
    //     return <OwnerCard key={owner.id} owner={owner} owners={owners} />
    //   })}
    // </div>
  )
}

export default OwnerView
