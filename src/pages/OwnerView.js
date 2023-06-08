import logo from "../images/profileImg.png"
import "./owner-view.css"
import { useState } from "react"
import { BsArrowLeftCircle } from "react-icons/bs"
import { BsArrowRightCircle } from "react-icons/bs"
import { BsCircleFill } from "react-icons/bs"
import { RxTriangleDown, RxTriangleUp, RxTriangleLeft } from "react-icons/rx"
import {
  LineChart,
  Line,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Bar
} from "recharts"
import {
  lineChartDataRS,
  lineChartDataP,
  lineChartDataC,
  barChartData2023,
  barChartData2014,
  barChartData2015
} from "./data/line-chart-data"

function OwnerView({ owners, dataFetch }) {
  let currentYear = new Date().getFullYear()

  const [currentIndex, setCurrentIndex] = useState(5)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [yearDropdownIsOpen, setYearDropdownIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("RS") // P // C
  const [activeYear, setActiveYear] = useState(currentYear)

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

  function handleYearClick() {
    setYearDropdownIsOpen(!yearDropdownIsOpen)
  }

  function handleYearSelect(year) {
    setActiveYear(year)
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

  function allTimeDataToFeed() {
    if (activeCategory === "RS") return lineChartDataRS
    if (activeCategory === "P") return lineChartDataP
    if (activeCategory === "C") return lineChartDataC

    return lineChartDataRS
  }

  function yearlyDataToFeed() {
    if (activeYear === 2014) return barChartData2014
    if (activeYear === 2015) return barChartData2015
    if (activeYear === 2023) return barChartData2023

    return barChartData2023
  }

  return (
    <div className="owners__container">
      <div className="column grid-left-owner-view"></div>
      <div className="grid-middle-owner-view">
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
          <div className="category-select-wrapper">
            <button
              onClick={() => setActiveCategory("RS")}
              className={`${activeCategory === "RS" ? "active" : ""}`}
            >
              Reg Szn
            </button>
            <button
              onClick={() => setActiveCategory("P")}
              className={`${activeCategory === "P" ? "active" : ""}`}
            >
              Playoffs
            </button>
            <button
              onClick={() => setActiveCategory("C")}
              className={`${activeCategory === "C" ? "active" : ""}`}
            >
              Combined
            </button>
          </div>
        </div>
        <div className="by-year-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={allTimeDataToFeed()}
              margin={{ right: 0, left: -30, top: 0, bottom: 0 }}
              width={500}
              height={300}
            >
              <Legend
                verticalAlign="top"
                align="right"
                height={1}
                iconType="plainline"
                iconSize="12"
              />
              {/* <CartesianGrid horizontal={false} vertical={false} /> */}
              <XAxis
                dataKey="name"
                axisLine={true}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickSize="0"
                type="number"
                domain={[0, 240]}
                axisLine={true}
                padding={{ right: 2, top: 20 }}
              />
              <Tooltip
                separator="-"
                itemStyle={{
                  height: 20,
                  width: 90,
                  fontSize: 10,
                  backgroundColor: "black",
                  margin: 0,
                  padding: "2px 0 0 4px",
                  display: "flex",
                  justifyContent: "space-between",
                  overflow: "hidden"
                }}
                wrapperStyle={{
                  padding: 0,
                  margin: 0
                }}
                contentStyle={{
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  border: "1px solid #004c54",
                  borderRadius: "5px",
                  overflow: "hidden",
                  display: "flex"
                }}
                labelStyle={{ display: "none" }}
              />
              <Line
                type="monotone"
                dataKey="LgAvg"
                stroke="#dddddd"
                fill="#dddddd"
                strokeDasharray="5 5"
                activeDot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="owner1"
                stroke="#004c54"
                fill="#004c54"
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="middle-row-owner-view bar-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearlyDataToFeed()}
              margin={{ left: -30 }}
              barSize={12}
            >
              <XAxis dataKey="stat" tickLine={false} />
              <YAxis scale="sqrt" tickLine={false} tickSize="0" />
              <Legend align="right" verticalAlign="top" />
              <Tooltip
                itemStyle={{
                  height: 20,
                  width: 90,
                  fontSize: 10,
                  backgroundColor: "black",
                  margin: 0,
                  padding: "2px 0 0 4px",
                  display: "flex",
                  justifyContent: "space-between",
                  overflow: "hidden"
                }}
                wrapperStyle={{
                  padding: 0,
                  margin: 0
                }}
                contentStyle={{
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  border: "1px solid #004c54",
                  borderRadius: "5px",
                  overflow: "hidden",
                  display: "flex"
                }}
                labelStyle={{ display: "none" }}
              />
              <Bar dataKey="owner1" fill="#004c54" />
              <Bar dataKey="owner2" fill="#dddddd" />
            </BarChart>
          </ResponsiveContainer>
          <div className="year-select-wrapper" onClick={handleYearClick}>
            <div className="year-select-wrapper-year">{activeYear}</div>
            <div class="year-select-wrapper-arrow">
              <RxTriangleDown />
            </div>
            <div
              className={`year-dropdown ${yearDropdownIsOpen ? "open" : ""}`}
            >
              {/* should be years.map() -- hardcoded for now */}
              <div onClick={() => handleYearSelect(2014)} className="year">
                2014
              </div>
              <div onClick={() => handleYearSelect(2015)} className="year">
                2015
              </div>
              <div className="year">2016</div>
              <div className="year">2017</div>
              <div className="year">2019</div>
              <div className="year">2020</div>
              <div className="year">2021</div>
              <div className="year">2022</div>
              <div onClick={() => handleYearSelect(2023)} className="year">
                2023
              </div>
            </div>
          </div>
        </div>
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
