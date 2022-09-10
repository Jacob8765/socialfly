import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getNumPositive, getNumNegative, getNumNeutral } from "../../util";

import axios from "axios";

import CommonWords from "../../components/CommonWords";
import DonutChart from "../../components/DonutChart";

export default function Results() {
  const router = useRouter();
  const { searchQuery } = router.query;

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

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
    <main className="bg-bage h-screen flex flex-col pl-10 pr-10">
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
              data={[
                getNumPositive(response),
                getNumNeutral(response),
                getNumNegative(response),
              ]}
            />
            <div className="space-y-2 grid justify-around">
              <CommonWords
                data={["Hate", "Love", "Peace", "Test", "Set"]}
                boxClassName="bg-red-500"
              />
              <CommonWords
                data={["Hate", "Love", "Peace", "Test", "Set"]}
                boxClassName="bg-blue-500"
              />
              <CommonWords
                data={["Hate", "Love", "Peace", "Test", "Set"]}
                boxClassName="bg-red-500"
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
}
