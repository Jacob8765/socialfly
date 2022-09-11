const express = require("express")
const axios = require("axios")
const natural = require("natural")
const { preProcess, findMostRelevantKeywords, parseKeywords } = require("./util.js")
const cors = require("cors")


//const API_SECRET = "FLARGffUCG6uvE0LbT21q4I5YPyLw2UAqbb1fkU1PpvQSpmKuk"
//const API_KEY = "WVP6eAVUNaHHf3w7NSY0FxBGo"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAMasgwEAAAAA3gWGg7zbD%2BpENv2AN0qEW61KQ4I%3DNWFlE482Xh0JY12OvtOX1o4K1F2qLDN4pOVSt6yrCU2Xh6sQP1"

const app = express()
app.use(cors())
const model = null

//takes in a string, outputs a sentiment score between -1 and 1
const analyzeTweet = async (tweet) => {
  tweet = preProcess(tweet)
  let score = await axios.get("http://localhost:7070/" + tweet).then((res) => {
    console.log(res.data)
    return parseFloat(res.data)
  }).catch(e => {
    console.log(e)
    throw e
  })

  return score
}

//uses twitter api, to get tweets that have the keywords passed in
const getTweets = async (keywords, sort="recency", username=undefined) => {
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${keywords ? keywords : 'from:' + username} lang:en -is:retweet&sort_order=${sort}&tweet.fields=public_metrics,text&max_results=100`

  let res = await axios.get(url, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`,
    }
  })
  .then(async function (res) {
    let response = res.data.data
    let averageSentiment = 0;
    let positiveKeywords = []
    let negativeKeywords = []

    for (let i = 0; i < response.length; i++){
      let sentiment = await analyzeTweet(response[i].text);
      averageSentiment += sentiment / response.length

      if (sentiment >= 0.6) {
        positiveKeywords = positiveKeywords.concat(parseKeywords(response[i].text))
      } else if (sentiment <= -0.6) {
        negativeKeywords = negativeKeywords.concat(parseKeywords(response[i].text))
      }
      response[i].sentiment = sentiment; 
    }

    return {...response, averageSentiment, numTweets: response.length, positiveKeywords: findMostRelevantKeywords(positiveKeywords), negativeKeywords: findMostRelevantKeywords(negativeKeywords)};
  })
  .catch(function (error) {
    console.log(error);
    throw "API error"
  });

  return res
}

app.get("/", async (req, res) => {
  res.json({status: 200, version: 0.2})
})

//gets the keywords and calls the latesttweets function by passing the keywords
app.get("/getTweets", async (req, res) => {
  let keywords = req.query.keywords
  let username = req.query.username
  let sort = req.query.sort

  try {
    const tweets = await getTweets(keywords, sort, username)
    res.json(tweets)
  } catch {
    res.sendStatus(500)
  }
})

// route to test the sentiment score by typing an arbtrary string
app.get("/testSentiment", async (req, res) => {
  let sentiment = await analyzeTweet(req.query.text);
  res.json({input: req.query.text, score: Math.tanh(sentiment*2)})
})

//starts server
app.listen(8000, async () => {
  await analyzeTweet("test")
  console.log("app live on port 8000")
})