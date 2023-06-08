import logo from "../images/profileImg.png"
import "./owner-view.css"
import { useState } from "react"
import { BsArrowLeftCircle } from "react-icons/bs"
import { BsArrowRightCircle } from "react-icons/bs"
import { BsCircleFill } from "react-icons/bs"
import { RxTriangleDown, RxTriangleUp, RxTriangleLeft } from "react-icons/rx"

function OwnerView({ owners, dataFetch }) {
  const [currentIndex, setCurrentIndex] = useState(5)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  function handleBackArrowClick() {
    if (currentIndex === 0) return
    setCurrentIndex((currentIndex) => currentIndex - 1)
  }

  function handleForwardArrowClick() {
    if (currentIndex === 11) return
    setCurrentIndex((currentIndex) => currentIndex + 1)
  }

  function handleDropdownClick() {
    setDropdownIsOpen(!dropdownIsOpen)
  }

  function handleDropdownSelection(index) {
    slideThrough(index)
    setDropdownIsOpen(false)
  }

  async function slideThrough(indexToGoTo) {
    if (currentIndex < indexToGoTo - 3) {
      for (let i = currentIndex; i < indexToGoTo; i++) {
        await delay(50)
        setCurrentIndex((currentIndex) => currentIndex + 1)
      }
    } else if (currentIndex > indexToGoTo + 3) {
      for (let i = currentIndex; i > indexToGoTo; i--) {
        await delay(50)
        setCurrentIndex((currentIndex) => currentIndex - 1)
      }
    } else {
      setCurrentIndex(indexToGoTo)
    }
  }

  function delay(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
  }

  return (
    <div className="owners__container">
      <div className="column grid-left-owner-view"></div>
      <div className="grid-middle-owner-view">
        <div className="middle-row-owner-view owner">
          {owners[currentIndex].ownerName}
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
                    ${index === currentIndex + 4 ? "next-x4" : ""}
                    ${index === currentIndex + 5 ? "next-x5" : ""}
                    ${index === currentIndex + 6 ? "next-x6" : ""}
                    ${index === currentIndex + 7 ? "next-x7" : ""}
                    ${index === currentIndex + 8 ? "next-x8" : ""}
                    ${index === currentIndex + 9 ? "next-x9" : ""}
                    ${index === currentIndex + 10 ? "next-x10" : ""}
                    ${index === currentIndex + 11 ? "next-x11" : ""}
                    ${index === currentIndex - 1 ? "prev" : ""}
                    ${index === currentIndex - 2 ? "prev-prev" : ""}
                    ${index === currentIndex - 3 ? "prev-prev-prev" : ""}
                    ${index === currentIndex - 4 ? "prev-x4" : ""}
                    ${index === currentIndex - 5 ? "prev-x5" : ""}
                    ${index === currentIndex - 6 ? "prev-x6" : ""}
                    ${index === currentIndex - 7 ? "prev-x7" : ""}
                    ${index === currentIndex - 8 ? "prev-x8" : ""}
                    ${index === currentIndex - 9 ? "prev-x9" : ""}
                    ${index === currentIndex - 10 ? "prev-x10" : ""}
                    ${index === currentIndex - 11 ? "prev-x11" : ""}

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
                    onClick={() => handleDropdownSelection(index)}
                  >
                    <BsCircleFill />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="dropdown-wrapper">
            <div className="owner-name" onClick={handleDropdownClick}>
              {owners[currentIndex].ownerName}
            </div>
            <div className="dropdown-arrow" onClick={handleDropdownClick}>
              {dropdownIsOpen ? <RxTriangleUp /> : <RxTriangleDown />}
            </div>
            {dropdownIsOpen ? (
              <div className="dropdown-owners-wrapper">
                {owners.map((owner, index) => {
                  return (
                    <div
                      onClick={() => handleDropdownSelection(index)}
                      className="owner-name-dropdown"
                      key={owner.id}
                    >
                      {index === currentIndex ? (
                        <div className="current-owner">
                          {owner.ownerName} <RxTriangleLeft />
                        </div>
                      ) : (
                        <div>{owner.ownerName}</div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              ""
            )}
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
