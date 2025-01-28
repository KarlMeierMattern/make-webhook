import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/search", {
        query,
      });
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        <div className="font-black text-4xl mb-4 pt-4">Search Something...</div>
        <div className="flex flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-slate-400 border-2 rounded-b-sm pl-2"
            placeholder="Search..."
          />
          <button
            className="cursor-pointer ml-2 bg-gray-300 p-1 border-2"
            type="submit"
          >
            Search
          </button>
        </div>
        {data && (
          <div className="pt-8 ml-8 mr-8 w-auto">{JSON.stringify(data)}</div>
        )}
      </div>
    </form>
  );
};

export default Home;
