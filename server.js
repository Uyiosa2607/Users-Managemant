const express = require("express")

const mongoose = require("mongoose");

require("dotenv").config();

const mongoURL = process.env.MONGODB_URL;

const path = require("path");

const bodyParser = require("body-parser");

const route = require("./server/router.js");

const app = express();

// Connect to MongoDB
mongoose
  .connect(mongoURL,{useNewUrlParser: true,useUnifiedTopology: true,}
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/assets")));

app.set("view engine","ejs");

app.use("/",route);


app.listen(port, ()=> console.log(`Server has started and Running on PORT ${port}, click the link to open in browser http://localhost:${port} `));
