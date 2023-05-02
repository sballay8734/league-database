import OwnerCard from "../components/OwnerCard/OwnerCard"

function OwnerView({ owners }) {
  return (
    <div className="App flex flex-wrap gap-4 bg-[#0B2447]">
      {owners.map((owner) => {
        return <OwnerCard key={owner.id} owner={owner} owners={owners} />
      })}
    </div>
  )
}

export default OwnerView
