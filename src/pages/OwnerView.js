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
import categoryData from "./data/owner-view-category-data"

function OwnerView({ owners, dataFetch }) {
  let currentYear = new Date().getFullYear()

  const [currentIndex, setCurrentIndex] = useState(5)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [categoryDropdownIsOpen, setCategoryDropdownIsOpen] = useState(false)
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

  function handleCategorySelect(item) {
    categoryData.filter((item) => {
      return item.Abbr !== activeCategory
    })
    setActiveCategory(item.Abbr)
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
      <div className="grid-left-owner-view">
        <div className="rankings"></div>
        <div className="records">
          <div className="records-good"></div>
          <div className="records-bad"></div>
        </div>
      </div>
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
                        <div className="owner current-owner">
                          {owner.ownerName} <RxTriangleLeft />
                        </div>
                      ) : (
                        <div className="owner">{owner.ownerName}</div>
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
          <div
            onClick={() => setCategoryDropdownIsOpen(!categoryDropdownIsOpen)}
            className="category-select-dropdown"
          >
            <div className="category-name">{activeCategory}</div>
            <div className="category-dropdown-arrow">
              {categoryDropdownIsOpen ? <RxTriangleUp /> : <RxTriangleDown />}
            </div>
            {categoryDropdownIsOpen ? (
              <div className="category-owners-wrapper">
                {categoryData.map((item) => {
                  return (
                    <div
                      onClick={() => handleCategorySelect(item)}
                      className="category-name-dropdown"
                      key={item.Abbr}
                    >
                      {item.Abbr}
                    </div>
                  )
                })}
              </div>
            ) : (
              ""
            )}
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
                  border: "1px solid var(--primary-color)",
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
                stroke="var(--primary-color)"
                fill="var(--primary-color)"
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
                  border: "1px solid var(--primary-color)",
                  borderRadius: "5px",
                  overflow: "hidden",
                  display: "flex"
                }}
                labelStyle={{ display: "none" }}
              />
              <Bar dataKey="owner1" fill="var(--primary-color)" />
              <Bar dataKey="owner2" fill="#dddddd" />
            </BarChart>
          </ResponsiveContainer>
          <div className="year-select-wrapper" onClick={handleYearClick}>
            <div className="year-select-wrapper-year">{activeYear}</div>
            <div className="year-select-wrapper-arrow">
              <RxTriangleDown />
            </div>
            <div
              className={`year-dropdown ${yearDropdownIsOpen ? "open" : ""}`}
            >
              {/* should be years.map() -- hardcoded for now */}
              <div
                onClick={() => handleYearSelect(2014)}
                className={`year ${activeYear === 2014 ? "active" : ""}`}
              >
                2014 {activeYear === 2014 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2015)}
                className={`year ${activeYear === 2015 ? "active" : ""}`}
              >
                2015 {activeYear === 2015 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2016)}
                className={`year ${activeYear === 2016 ? "active" : ""}`}
              >
                2016 {activeYear === 2016 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2017)}
                className={`year ${activeYear === 2017 ? "active" : ""}`}
              >
                2017 {activeYear === 2017 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2018)}
                className={`year ${activeYear === 2018 ? "active" : ""}`}
              >
                2018 {activeYear === 2018 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2019)}
                className={`year ${activeYear === 2019 ? "active" : ""}`}
              >
                2019 {activeYear === 2019 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2020)}
                className={`year ${activeYear === 2020 ? "active" : ""}`}
              >
                2020 {activeYear === 2020 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2021)}
                className={`year ${activeYear === 2021 ? "active" : ""}`}
              >
                2021 {activeYear === 2021 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2022)}
                className={`year ${activeYear === 2022 ? "active" : ""}`}
              >
                2022 {activeYear === 2022 ? <RxTriangleLeft /> : ""}
              </div>
              <div
                onClick={() => handleYearSelect(2023)}
                className={`year ${activeYear === 2023 ? "active" : ""}`}
              >
                2023 {activeYear === 2023 ? <RxTriangleLeft /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-right-owner-view">
        {/* Need to make 2 tables - one per year, one all time */}
        <table className="spreadsheet">
          <thead>
            <tr>
              <th>Stat</th>
              <th className="text-center">Value</th>
              <th className="text-center">+/-</th>
              <th className="text-center">Lg. Avg.</th>
              <th className="text-center">Rank</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-stat">Avg. PF</td>
              <td>123.5</td>
              <td className="plus-minus green">+8</td>
              <td>115.5</td>
              <td className="table-rank rank-three">3</td>
            </tr>
            <tr>
              <td className="table-stat">Avg. PA</td>
              <td>115.22</td>
              <td className="plus-minus red">-5.2</td>
              <td>110.02</td>
              <td className="table-rank rank-five">5</td>
            </tr>
            <tr>
              <td className="table-stat">Total PF</td>
              <td>1487.3</td>
              <td className="plus-minus green">+110</td>
              <td>1377.3</td>
              <td className="table-rank rank-two">2</td>
            </tr>
            <tr>
              <td className="table-stat">Total PA</td>
              <td>1322</td>
              <td className="plus-minus red">-50.8</td>
              <td>1372.8</td>
              <td className="table-rank rank-eight">8</td>
            </tr>
            <tr>
              <td className="table-stat">Avg. PPW</td>
              <td>133.5</td>
              <td className="plus-minus green">+7.2</td>
              <td>125.3</td>
              <td className="table-rank rank-three">3</td>
            </tr>
            <tr>
              <td className="table-stat">Avg. PPL</td>
              <td>115.2</td>
              <td className="plus-minus green">+12</td>
              <td>103.2</td>
              <td className="table-rank rank-one">1</td>
            </tr>
            <tr>
              <td className="table-stat">Wins</td>
              <td>11</td>
              <td className="plus-minus green">+3</td>
              <td>8</td>
              <td className="table-rank rank-two">2</td>
            </tr>
            <tr>
              <td className="table-stat">Losses</td>
              <td>3</td>
              <td className="plus-minus red">-3</td>
              <td>6</td>
              <td className="table-rank rank-two">2</td>
            </tr>
            <tr>
              <td className="table-stat">Win %</td>
              <td>60.3%</td>
              <td className="plus-minus green">+14%</td>
              <td>46.3%</td>
              <td className="table-rank rank-two">2</td>
            </tr>
            {/* All time stats */}
            {/* <tr>
              <td>Avg. WPS</td>
            </tr>
            <tr>
              <td>Avg. LPS</td>
            </tr> */}
            <tr>
              <td className="table-stat">Last</td>
              <td>False</td>
              <td className="plus-minus">N/A</td>
              <td>N/A</td>
              <td className="table-rank">N/A</td>
            </tr>
            <tr>
              <td className="table-stat">Playoffs</td>
              <td>True</td>
              <td className="plus-minus">N/A</td>
              <td>N/A</td>
              <td className="table-rank">N/A</td>
            </tr>
            <tr>
              <td className="table-stat">Champ</td>
              <td>False</td>
              <td className="plus-minus">N/A</td>
              <td>N/A</td>
              <td className="table-rank">N/A</td>
            </tr>
            <tr>
              <td className="table-stat">Koth Place</td>
              <td>N/A</td>
              <td className="plus-minus">N/A</td>
              <td>N/A</td>
              <td className="table-rank rank-three">3</td>
            </tr>
            <tr>
              <td className="table-stat">Best Week</td>
              <td>172</td>
              <td className="plus-minus green">+17</td>
              <td>155</td>
              <td className="table-rank rank-three">3</td>
            </tr>
            <tr>
              <td className="table-stat">Worst Week</td>
              <td>97</td>
              <td className="plus-minus green">+10</td>
              <td>87</td>
              <td className="table-rank rank-four">4</td>
            </tr>
            <tr>
              <td className="table-stat">Close Ws</td>
              <td>3</td>
              <td className="plus-minus green">+1</td>
              <td>2</td>
              <td className="table-rank rank-five">5</td>
            </tr>
            <tr>
              <td className="table-stat">Close Ls</td>
              <td>2</td>
              <td className="plus-minus red">-1</td>
              <td>3</td>
              <td className="table-rank rank-eight">8</td>
            </tr>
            <tr>
              <td className="table-stat">Lucky Ws</td>
              <td>1</td>
              <td className="plus-minus red">-3</td>
              <td>4</td>
              <td className="table-rank rank-one">1</td>
            </tr>
            <tr>
              <td className="table-stat">Unlucky Ls</td>
              <td>3</td>
              <td className="plus-minus green">+1</td>
              <td>2</td>
              <td className="table-rank rank-six">6</td>
            </tr>
            <tr>
              <td className="table-stat">Best Streak</td>
              <td>5</td>
              <td className="plus-minus green">+3</td>
              <td>2</td>
              <td className="table-rank rank-two">2</td>
            </tr>
            <tr>
              <td className="table-stat">Worst Streak</td>
              <td>2</td>
              <td className="plus-minus red">-1</td>
              <td>3</td>
              <td className="table-rank rank-two">2</td>
            </tr>
            <tr>
              <td className="table-stat">Biggest W</td>
              <td>100</td>
              <td className="plus-minus green">+29</td>
              <td>71</td>
              <td className="table-rank rank-ten">10</td>
            </tr>
            <tr>
              <td className="table-stat">Biggest L</td>
              <td>12</td>
              <td className="plus-minus red">-25</td>
              <td>37</td>
              <td className="table-rank rank-twelve">12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OwnerView
