const mongoose = require("mongoose");
const routes = require("./routes/ravenRoutes");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const url = "mongodb://localhost:27017/revan";
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) {
      console.log(err);
      process.exit(0);
    }
    console.log("connection established");
  }
);
app.use("/raven", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("listening on port" + port));
