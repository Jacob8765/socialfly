const express = require("express")
const { Client } = require("twitter-api-sdk");

const API_SECRET = "FLARGffUCG6uvE0LbT21q4I5YPyLw2UAqbb1fkU1PpvQSpmKuk"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAMasgwEAAAAA3gWGg7zbD%2BpENv2AN0qEW61KQ4I%3DNWFlE482Xh0JY12OvtOX1o4K1F2qLDN4pOVSt6yrCU2Xh6sQP1"
const API_KEY = "WVP6eAVUNaHHf3w7NSY0FxBGo"
const client = new Client(BEARER_TOKEN);

const app = express()

app.get("/", async (req, res) => {
  const tweet = await client.tweets.findTweetById("20");
  console.log(tweet.data.text);

  res.json(tweet)
})

app.listen(5000, () => {
  console.log("app live on port 5000")
})