const express = require("express");
const mainRouter = require("./routers/index");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
