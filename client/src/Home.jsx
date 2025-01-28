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
      console.log("API Response:", response.data); // Log the entire response
      const fetchedData = response.data.data;
      console.log("Fetched Data:", fetchedData); // Log the fetched data
      if (fetchedData && fetchedData.length > 0) {
        setData(fetchedData[0].organic_results);
      } else {
        console.log("No data found"); // Log if no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-400">
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-blue-600"
          />
          <button className="cursor-pointer" type="submit">
            Search
          </button>{" "}
          {data && (
            <div className="text-black">
              {data.map((result, index) => (
                <div key={index}>
                  <h3>{result.title}</h3>
                  <a href={result.link}>{result.link}</a>
                  <p>{result.snippet}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Home;
