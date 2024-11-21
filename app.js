const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const conn = require("./db/conn");
const homeRouter = require("./routes/homeRouter");
const aboutRouter = require("./routes/aboutRouter");

app.use(
    express.urlencoded({
      extended: true,
    })
  );
  

app.engine(
  "handlebars",
  exphbs.engine({
    extname: ".handlebars",
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static("public"));

app.use("/", homeRouter);
app.use("/about", aboutRouter);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
