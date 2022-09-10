import SearchBar from "../components/SearchBar";

import PhoneIcon from "../components/PhoneImage";
import MacImage from "../components/MacImage";

export default function Home() {
  return (
    <main className="bg-bage h-screen w-screen flex items-center flex-row justify-center space-x-20">
      <div>
        <h1 className="text-7xl font-inter font-bold pb-2 sky-gradient">
          SocialFly
        </h1>
        <h3 className="pb-8 font-inter text-lg font-bold text-cement-gray">
          Soar through social media - one search at a time.
        </h3>
        <SearchBar />
      </div>
      <div className="relative ">
        <PhoneIcon className="w-3/6 absolute -left-24 bottom-4 opacity-90" />
        <MacImage className="w-[400px]" />
      </div>
    </main>
  );
}
