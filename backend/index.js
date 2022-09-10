const express = require("express")
const axios = require("axios")
const natural = require("natural")
const {preProcess} = require("./model/util.js")

//const API_SECRET = "FLARGffUCG6uvE0LbT21q4I5YPyLw2UAqbb1fkU1PpvQSpmKuk"
//const API_KEY = "WVP6eAVUNaHHf3w7NSY0FxBGo"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAMasgwEAAAAA3gWGg7zbD%2BpENv2AN0qEW61KQ4I%3DNWFlE482Xh0JY12OvtOX1o4K1F2qLDN4pOVSt6yrCU2Xh6sQP1"

const app = express()

const analyzeTweet = async (tweet) => {
  let preProcessedTweet = preProcess(tweet)

  const Sentianalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  const analysis_score = Sentianalyzer.getSentiment(preProcessedTweet);
  //console.log("Sentiment Score: ",analysis_score);
  return Math.tanh(sentiment*2)
}

const getLatestTweets = async (keywords) => {
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${keywords}&tweet.fields=geo,public_metrics,text&expansions=attachments.media_keys,attachments.poll_ids,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id&place.fields=country,geo,id`

  let res = axios.get(url, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`,
    }
  })
  .then(async function (res) {
    let response = res.data.data

    for (i=0; i< response.length; i++){
      let sentiment = await analyzeTweet(response[i].text);
      response[i].sentiment = sentiment; 
    }
    return response;
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

app.get("/testSentiment", async (req, res) => {
  let sentiment = await analyzeTweet(req.query.text);
  res.json({input: req.query.text, score: Math.tanh(sentiment*2)})
})

app.listen(5000, async () => {
  console.log("app live on port 5000")
})