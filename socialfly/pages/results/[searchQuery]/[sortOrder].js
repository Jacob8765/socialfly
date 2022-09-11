import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  getNumPositive,
  getNumNegative,
  getNumNeutral,
  getNumberLikes,
  getNumberRetweets,
  getBubbleData,
} from "../../../util";

import axios from "axios";

import CommonWords from "../../../components/CommonWords";
import DonutChart from "../../../components/DonutChart";
import BubbleChart from "../../../components/BubbleChart";
import PolarChart from "../../../components/PolarChart";

export default function Results() {
  const router = useRouter();
  const { searchQuery, sortOrder } = router.query;

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  let { positiveLikes, negativeLikes } = getNumberLikes(response);
  let { positiveRetweets, negativeRetweets } = getNumberRetweets(response);

  function returnDashboard() {
    if (loading) {
      return <div className="flex justify-center items-center h-screen">
        <h1 className="text-7xl font-bold">Loading...</h1>
      </div>
    } else {
      return (
        <>
          <div className="bg-white max-w-[1920px] p-3 mb-2">
            <div className="w-fit">
              <h1 className="text-5xl font-inter font-bold pb-2 sky-gradient">
                Current Query: {searchQuery}
              </h1>
              <h3 className="font-montserrat">
                Number of Tweets: {response.numTweets}, based on {sortOrder}.
              </h3>
            </div>
          </div>
          <section className="flex flex-wrap gap-4 justify-center">
            <DonutChart
              labels={["Positive", "Neutral", "Negative"]}
              title={`Tweet Pie Chart: ${searchQuery}`}
              backgroundColors={["#50A5DC", "#6C6A6A", "#FC813C"]}
              data={[
                getNumPositive(response),
                getNumNeutral(response),
                getNumNegative(response),
              ]}
            />
            <BubbleChart
              data={getBubbleData(response)}
              title="Engagement vs Rating"
            />

            <PolarChart
              data={[
                positiveLikes,
                negativeLikes,
                positiveRetweets,
                negativeRetweets,
              ]}
              labels={[
                "Positive Tweet Likes",
                "Negative Tweet Likes",
                "Positive Tweet Retweets",
                "Negative Tweet Retweets",
              ]}
              backgroundColor={[
                "rgb(80, 165, 220, .60)",
                "rgba(252, 129, 60, .60)",
                "rgba(80, 165, 220, .60)",
                "rgba(252, 129, 60, .60)",
              ]}
              title="Engagement Numbers"
            />

            <div className="space-y-2 grid justify-around row-span-2">
              <CommonWords
                data={response.negativeKeywords}
                boxClassName="bg-[#FC813C]"
                title="Negative"
              />
              <CommonWords
                boxClassName="bg-[#50A5DC]"
                title="Positive"
                data={response.positiveKeywords}
              />
            </div>
          </section>
        </>
      );
    }
  }

  async function getData() {
    let url = `http://localhost:8000/getTweets?keywords=${searchQuery}&sort=${sortOrder}`;
    if (searchQuery[0] == "@") {
      //if the query is a username...
      url = `http://localhost:8000/getTweets?username=${searchQuery.substring(
        1
      )}&sort=${sortOrder}`;
    }

    try {
      setLoading(true);
      let rawResponse = await axios.get(url);
      if (rawResponse) {
        setLoading(false);
      }
      setResponse(rawResponse.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  return (
    <main className="bg-bage min-h-screen flex flex-col pl-10 pr-10">
      {returnDashboard()}
    </main>
  );
}
