import { useRouter } from "next/router";

import CommonWords from "../../components/CommonWords";
import DonutChart from "../../components/DonutChart";

export default function Results() {
  const router = useRouter();
  const { searchQuery } = router.query;

  return (
    <main className="bg-bage h-screen flex flex-col pl-10 pr-10">
      <div className="bg-white max-w-[1920px] p-3 mb-2">
        <h2 className="text-4xl">Query:</h2>
        <h1 className="text-5xl font-inter font-bold pb-2 sky-gradient">
          {searchQuery}
        </h1>
      </div>
      <section className="flex flex-wrap gap-2">
        <DonutChart />
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
    </main>
  );
}
