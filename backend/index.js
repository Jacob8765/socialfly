const express = require("express")
const axios = require("axios")
const natural = require("natural")
const {preProcess} = require("./util.js")
const cors = require("cors")

//const API_SECRET = "FLARGffUCG6uvE0LbT21q4I5YPyLw2UAqbb1fkU1PpvQSpmKuk"
//const API_KEY = "WVP6eAVUNaHHf3w7NSY0FxBGo"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAMasgwEAAAAA3gWGg7zbD%2BpENv2AN0qEW61KQ4I%3DNWFlE482Xh0JY12OvtOX1o4K1F2qLDN4pOVSt6yrCU2Xh6sQP1"

const app = express()
app.use(cors())

//takes in a string, outputs a sentiment score between -1 and 1
const analyzeTweet = async (tweet) => {
  let preProcessedTweet = preProcess(tweet)
  let keywords = []

  const Sentianalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  const analysis_score = Sentianalyzer.getSentiment(preProcessedTweet);
  
  preProcessedTweet.map((word, i) => {
    let score = Sentianalyzer.getSentiment([word])
    if (i > 0 && (score == 0 && Math.abs(Sentianalyzer.getSentiment([preProcessedTweet[i-1]])) >= 0.9)) {
      console.log("adding to keywords", word)
      keywords.push(word)
    }
  })

  return {score: Math.tanh(analysis_score*2), keywords}
}

//uses twitter api, to get the latest tweets that have the keywords passed in
const getLatestTweets = async (keywords, type="recent") => {
  const url = `https://api.twitter.com/2/tweets/search/${type}?query=${keywords} lang:en&tweet.fields=geo,public_metrics,text&expansions=attachments.media_keys,attachments.poll_ids,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id&place.fields=country,geo,id&max_results=50`

  let res = axios.get(url, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`,
    }
  })
  .then(async function (res) {
    let response = res.data.data
    let sum = 0;
    let positiveKeywords = []
    let negativeKeywords = []


    for (i=0; i<response.length; i++){
      let analysis = await analyzeTweet(response[i].text);
      let sentiment = analysis.score
      let key = analysis.keywords

      console.log(sentiment, key)
      if (sentiment >= 0.3) {
        console.log("adding to positive", key)
        positiveKeywords = positiveKeywords.concat(key)
      } else if (sentiment <= -0.3) {
        console.log("adding to negative", key)
        negativeKeywords = negativeKeywords.concat(key)
      }
      response[i].sentiment = sentiment; 
      sum += sentiment;
    }

    sum /= response.length
    return {...response, aggregateSentimate: sum, numTweets: response.length, positiveKeywords, negativeKeywords};
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

//gets the keywords and calls the latesttweets function by passing the keywords
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

//gets the keywords and calls the latesttweets function by passing the keywords
app.get("/getUserSentiment", async (req, res) => {
  let username = req.query.username
  const url = `https://api.twitter.com/2/tweets/search/recent?query=from:${username} lang:en&tweet.fields=text`

  let aggregateSentimate = 0
  await axios.get(url, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`,
    }
  })
  .then(async (response) => {
    console.log(response.data)
    response.data.data.map(async tweet => {
      sentimate = await analyzeTweet(tweet.text)
      console.log(tweet.text, sentimate)
      aggregateSentimate += sentimate / response.data.data.length
    })
    return aggregateSentimate
  }).catch((e) => {
    throw e
  })

  res.send({aggregateSentimate})
})

// route to test the sentiment score by typing an arbtrary string
app.get("/testSentiment", async (req, res) => {
  let sentiment = await analyzeTweet(req.query.text);
  res.json({input: req.query.text, score: Math.tanh(sentiment*2)})
})

//starts server
app.listen(8000, async () => {
  console.log("app live on port 8000")
})