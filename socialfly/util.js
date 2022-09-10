export function getNumPositive(tweetData) {
  let numPositive = 0;
  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment >= 0.5) numPositive++;
  }

  return numPositive;
}

export function getNumNegative(tweetData) {
  let numNegative = 0;
  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment <= -0.5) numNegative++;
  }

  return numNegative;
}

export function getNumNeutral(tweetData) {
  let numNeutral = 0;
  for (let i = 0; i < tweetData.numTweets; i++) {
    if (tweetData[i].sentiment <= 0.5 && tweetData[i].sentiment >= -0.5)
      numNeutral++;
  }

  return numNeutral;
}
