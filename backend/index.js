const express = require("express")
const axios = require("axios")
const tf = require("@tensorflow/tfjs")
const modelUtil = require("./model/util")
const path = require("path");

//import sentiment model
const model = require("./model/model.json")
const metadata = require("./model/metadata.json")

const API_SECRET = "FLARGffUCG6uvE0LbT21q4I5YPyLw2UAqbb1fkU1PpvQSpmKuk"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAMasgwEAAAAA3gWGg7zbD%2BpENv2AN0qEW61KQ4I%3DNWFlE482Xh0JY12OvtOX1o4K1F2qLDN4pOVSt6yrCU2Xh6sQP1"
const API_KEY = "WVP6eAVUNaHHf3w7NSY0FxBGo"

const app = express()
var sentimentModel = null

const loadModel = async () => {
  console.log("loading model...")
  try {
    let url = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json'
    console.log("URL", url)
    sentimentModel = await tf.loadLayersModel(url)
  } catch (e) {
    console.log(e)
    throw "Error loading model"
  }
}

const analyzeTweet = async (tweet) => {
  if (!sentimentModel) { //Load the model if it's not already
    try {
      console.log("model is null")
      await loadModel()
    } catch (e) {
      throw e
    }
  }

  let tweet_text = tweet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''); //remove all links
  tweet_text = tweet_text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' '); //more sanitization
    // Convert the words to a sequence of word indices.
    const sequence = tweet_text.map(word => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    // Perform truncation and padding.
    const paddedSequence = modelUtil.padSequences([sequence], metadata.max_len);
    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
 
    const predictOut = sentimentModel.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();

    return score
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
  let sentiment = await analyzeTweet("")
  console.log(sentiment)

  console.log("app live on port 5000")
})