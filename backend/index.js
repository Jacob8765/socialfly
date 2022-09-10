const express = require("express")
const axios = require("axios")

const API_SECRET = "FLARGffUCG6uvE0LbT21q4I5YPyLw2UAqbb1fkU1PpvQSpmKuk"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAMasgwEAAAAA3gWGg7zbD%2BpENv2AN0qEW61KQ4I%3DNWFlE482Xh0JY12OvtOX1o4K1F2qLDN4pOVSt6yrCU2Xh6sQP1"
const API_KEY = "WVP6eAVUNaHHf3w7NSY0FxBGo"

const app = express()

app.get("/", async (req, res) => {
  res.json({status: 200, version: 0.1})
})

app.get("/getTweets", async (req, res) => {
  console.log(req.query.keywords)
  let keywords = req.query.keywords.replace(",", " ")

  const url = `https://api.twitter.com/2/tweets/search/recent?query=(${keywords})&tweet.fields=text&place.fields=country,geo,id`

  axios.get(url, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`,
    }
  })
  .then(function (response) {
    //console.log(response);
    res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
    res.sendStatus(500)
  });

})

app.listen(5000, () => {
  console.log("app live on port 5000")
})