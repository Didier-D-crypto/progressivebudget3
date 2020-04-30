const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes/api"),
const compression = require("compression");

const PORT = process.env.PORT || 3000;
const Status = 'connection established'
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => {console.log(`${Status}`)})

.catch(err => {console.log(err)});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
})

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});