export function getBubbleData(tweetData) {
  console.log("getting tweet data");
  let positiveData = [];
  let negativeData = [];
  let neutralData = [];

  for (let i = 0; i < tweetData.numTweets; i++) {
    console.log(tweetData[i].public_metrics.like_count);
    const engagement = Math.log(
      tweetData[i].public_metrics.like_count +
        tweetData[i].public_metrics.retweet_count +
        tweetData[i].public_metrics.reply_count ** 2 +
        1
    );
    if (tweetData[i].sentiment > 0.3) {
      positiveData.push({ x: tweetData[i].sentiment, y: engagement, r: 7 }); //take the log of the likes
    } else if (tweetData[i].sentiment < -0.3) {
      negativeData.push({ x: tweetData[i].sentiment, y: engagement, r: 7 }); //take the log of the likes
    } else {
      neutralData.push({ x: tweetData[i].sentiment, y: engagement, r: 7 }); //take the log of the likes
    }
  }

  const chartData = {
    datasets: [
      {
        label: "Positive",
        backgroundColor: "#50A5DC",
        data: positiveData,
      },
      {
        label: "Negative",
        backgroundColor: "#FC813C",
        data: negativeData,
      },
      {
        label: "Neutral",
        backgroundColor: "#6C6A6A",
        data: neutralData,
      },
    ],
  };

  return chartData;
}

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
