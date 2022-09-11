import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  getNumPositive,
  getNumNegative,
  getNumNeutral,
  getNumberLikes,
  getNumberRetweets,
} from "../../util";

import axios from "axios";

import CommonWords from "../../components/CommonWords";
import DonutChart from "../../components/DonutChart";
import BarGraph from "../../components/BarGraph";

export default function Results() {
  const router = useRouter();
  const { searchQuery } = router.query;

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  let { positiveLikes, negativeLikes } = getNumberLikes(response);
  let { positiveRetweets, negativeRetweets } = getNumberRetweets(response);

  async function getData() {
    try {
      let rawResponse = await axios.get(
        `http://localhost:8000/getTweets?keywords=${searchQuery}`
      );
      setLoading(true);
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
      {!loading && (
        <>
          <div className="bg-white max-w-[1920px] p-3 mb-2">
            <h2 className="text-4xl">Query:</h2>
            <h1 className="text-5xl font-inter font-bold pb-2 sky-gradient">
              {searchQuery}
            </h1>
          </div>
          <section className="flex flex-wrap gap-2">
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
            <div className="space-y-2 grid justify-around flex-grow">
              <CommonWords
                data={["Hate", "Love", "Peace", "Test", "Set"]}
                boxClassName="bg-[#FC813C]"
                title="Negative"
              />
              <CommonWords
                data={["Hate", "Love", "Peace", "Test", "Set"]}
                boxClassName="bg-[#50A5DC]"
                title="Positive"
              />
              <CommonWords
                data={["Hate", "Love", "Peace", "Test", "Set"]}
                boxClassName="bg-[#6C6A6A]"
                title="Neutral"
              />
              <BarGraph
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
                backgroundColors={["#50A5DC", "#FC813C", "#50A5DC", "#FC813C"]}
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
}
