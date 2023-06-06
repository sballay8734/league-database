import logo from "../images/profileImg.png"
import "./owner-view.css"
import { useState } from "react"
import { BsArrowLeftCircle } from "react-icons/bs"
import { BsArrowRightCircle } from "react-icons/bs"
import { BsCircleFill } from "react-icons/bs"

function OwnerView({ owners }) {
  const [currentIndex, setCurrentIndex] = useState(5)

  function handleBackArrowClick() {
    if (currentIndex === 0) return
    setCurrentIndex((currentIndex) => currentIndex - 1)
  }

  function handleForwardArrowClick() {
    if (currentIndex === 11) return
    setCurrentIndex((currentIndex) => currentIndex + 1)
  }

  return (
    <div className="owners__container">
      <div className="column grid-left-owner-view"></div>
      <div className="grid-middle-owner-view">
        <div className="middle-row-owner-view owner">
          {owners[currentIndex][2014].wins}
        </div>
        <div className="by-year-owner-view">
          <div className="middle-row owner-wrapper-test">
            {owners.map((owner, index) => {
              return (
                <div
                  className={`owner-test-card 
                    ${index === currentIndex ? "active" : ""}
                    ${index === currentIndex + 1 ? "next" : ""}
                    ${index === currentIndex + 2 ? "next-next" : ""}
                    ${index === currentIndex + 3 ? "next-next-next" : ""}
                    ${index === currentIndex - 1 ? "prev" : ""}
                    ${index === currentIndex - 2 ? "prev-prev" : ""}
                    ${index === currentIndex - 3 ? "prev-prev-prev" : ""}

                  `}
                  key={owner.id}
                >
                  <img src={logo} alt="profile"></img>
                  <h1>{owner.ownerName}</h1>
                </div>
              )
            })}
          </div>
          <div className="arrow-wrapper">
            <div onClick={handleForwardArrowClick} className="arrow-right">
              <BsArrowRightCircle />
            </div>
            <div onClick={handleBackArrowClick} className="arrow-left">
              <BsArrowLeftCircle />
            </div>
            <div className="pagination">
              {owners.map((owner, index) => {
                return (
                  <div
                    className={`page-icon ${
                      index === currentIndex ? "active" : ""
                    }`}
                    key={owner.id}
                  >
                    <BsCircleFill />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="middle-row all-time"></div>
      </div>
      <div className="column grid-right-owner-view"></div>
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
