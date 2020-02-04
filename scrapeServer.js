const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 5050;
require('dotenv').config();
require("./database/pg_notify");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(
  cors({
    // Frontend host
    origin: "http://localhost:3000",
    credentials: true
  })
);

/* Cron Jobs */
const { CronJob } = require("cron");
const { scrape, heartbeat } = require("./crons/craigslist/options");
new CronJob(...scrape);
new CronJob(...heartbeat);

(async () => {
  try {
    app.listen(port, () => {
      console.log(`App running on port ${port}.`);
    });
  } catch (error) {
    console.error(error);
  }
})();

// Catch unhandled rejections and exceptions
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", err => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
