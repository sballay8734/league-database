const express = require("express")
const router = express.Router()

router.get("/hello", (req, res) => {
  const testData = [1, 2, 3, 4]

  res.send(testData)
  console.log(testData)
})

// const dbPaths = [
//   { avgPFRegSznYearly: "/avgpf/regszn/[year]" },
//   { avgPFPlayoffsYearly: "/avgpf/playoffs/[year]" },
//   { avgPFCombinedYearly: "/avgpf/combined/[year]" },
//   { avgPFRegSznAllTime: "/avgpf/regszn/alltime" },
//   { avgPFPlayoffsAllTime: "/avgpf/playoffs/alltime" },
//   { avgPFCombinedAllTime: "/avgpf/combined/alltime" }
// ]

module.exports = router
