import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <main className="bg-bage h-screen w-screen flex items-center flex-row justify-around">
      <div>
        <h1 className="text-7xl font-inter font-bold bg-clip-text bg-gradient-to-r from-light-blue to-dark-blue text-transparent">
          SocialFly
        </h1>
        <h3 className="font-inter text-lg font-bold text-cement-gray">
          Soar through social media - one search at a time.
        </h3>
        <SearchBar />
      </div>
      <div>Images</div>
    </main>
  );
}
