import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/search", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).send("Query is required");
  }

  try {
    const response = await fetch(
      "https://hook.eu2.make.com/2m6qq7w2rkl8hop4qq8d4j9xpedo35wb",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: query }),
      }
    );

    const data = await response.json();
    res.status(200).json({ message: "Data successfully sent", data: data });
    console.log("Data successfully sent 🚀");
  } catch (error) {
    console.log(error);
  }
});

// app.get("/search", (req, res) => {
//   // const { query } = req.query;

//   if (searchData) {
//     return res
//       .status(200)
//       .send({ message: "Data successfully sent", searchData });
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on port http://localhost:${process.env.PORT} ✅`
  );
});
