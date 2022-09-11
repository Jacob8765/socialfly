export function getNumPositive(tweetData) {
  let numPositive = 0;
  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment > 0.3) numPositive++;
  }

  return numPositive;
}

export function getNumNegative(tweetData) {
  let numNegative = 0;
  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment < -0.3) numNegative++;
  }

  return numNegative;
}

export function getNumNeutral(tweetData) {
  let numNeutral = 0;
  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment <= 0.3 && tweetData[i].sentiment >= -0.3)
      numNeutral++;
  }

  return numNeutral;
}

export function getNumberLikes(tweetData) {
  let positiveLikes = 0;
  let negativeLikes = 0;

  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment < -0.3)
      negativeLikes += tweetData[i].public_metrics.like_count;
    else positiveLikes += tweetData[i].public_metrics.like_count;
  }

  return {
    positiveLikes,
    negativeLikes,
  };
}

export function getNumberRetweets(tweetData) {
  let positiveRetweets = 0;
  let negativeRetweets = 0;

  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment < -0.3)
      negativeRetweets += tweetData[i].public_metrics.retweet_count;
    else positiveRetweets += tweetData[i].public_metrics.retweet_count;
  }

  return {
    positiveRetweets,
    negativeRetweets,
  };
}
