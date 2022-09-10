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
    if (tweetData[i].sentiment < -0.1) numNegative++;
  }

  return numNegative;
}

export function getNumNeutral(tweetData) {
  let numNeutral = 0;
  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment <= 0.3 && tweetData[i].sentiment >= -0.1)
      numNeutral++;
  }

  return numNeutral;
}
