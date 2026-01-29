const express = require("express");
const cors = require("cors");
const { getPDCContent } = require("./api/content");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/content", (req, res) => {
  res.json(getPDCContent());
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
