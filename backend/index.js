const express = require("express")
const axios = require("axios")
const natural = require("natural")
const {preProcess} = require("./model/util.js")

const API_SECRET = "FLARGffUCG6uvE0LbT21q4I5YPyLw2UAqbb1fkU1PpvQSpmKuk"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAMasgwEAAAAA3gWGg7zbD%2BpENv2AN0qEW61KQ4I%3DNWFlE482Xh0JY12OvtOX1o4K1F2qLDN4pOVSt6yrCU2Xh6sQP1"
const API_KEY = "WVP6eAVUNaHHf3w7NSY0FxBGo"

const app = express()
var sentimentModel = null


const analyzeTweet = async (tweet) => {
  let preProcessedTweet = preProcess(tweet)

  const Sentianalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  const analysis_score = Sentianalyzer.getSentiment(preProcessedTweet);
  console.log("Sentiment Score: ",analysis_score);
}

const getLatestTweets = async (keywords) => {
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${keywords}&tweet.fields=geo,public_metrics,text&expansions=attachments.media_keys,attachments.poll_ids,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id&place.fields=country,geo,id`

  let res = axios.get(url, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`,
    }
  })
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
    throw "API error"
  });

  return res
}

app.get("/", async (req, res) => {
  res.json({status: 200, version: 0.1})
})

app.get("/getTweets", async (req, res) => {
  console.log(req.query.keywords)
  let keywords = req.query.keywords.replace(",", " ")

  try {
    const response = await getLatestTweets(keywords)
    res.json(response)
  } catch {
    res.sendStatus(500)
  }
})

app.listen(5000, async () => {
  let sentiment = await analyzeTweet("i love and hate the iphone!")
  console.log(sentiment)

  console.log("app live on port 5000")
})