const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const tasks = require("./routes/index");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandleMiddleware = require("./middleware/errorHandle");

//routes

app.use("/api/tasks", tasks);
app.use(notFound);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
