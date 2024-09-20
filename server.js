const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const API_KEY = "sk-None-lUZpyyoqa1NWCy5DrFW7T3BlbkFJI7S6GkfUsxyuEJXEzaHE";

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post("/completions", async (req, res) => {
  const fetch = (await import("node-fetch")).default; // Dynamic import for node-fetch

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.messages }],
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data); // Log the entire response for debugging
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
