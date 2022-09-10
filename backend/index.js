const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("status:200")
})

app.listen(5000, () => {
  console.log("app live on port 5000")
})