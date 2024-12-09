const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const conn = require("./db/conn");
const homeRouter = require("./routes/homeRouter");
const aboutRouter = require("./routes/aboutRouter");
const contactRouter = require("./routes/contactRouter");
const logintRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const session = require('express-session');

app.use(session({
  secret: 'key secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // Sessão expira após 1 hora (3600000 ms)
}));

app.use(
    express.urlencoded({
      extended: true,
    })
);

// importar modulo fileupload
const fileupload = require('express-fileupload');

// habilitando fileupload
app.use(fileupload());

app.engine(
  "handlebars",
  exphbs.engine({
    extname: ".handlebars",
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

app.set("views", path.join(__dirname, "views"));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static("public"));

app.use("/", homeRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/login", logintRouter);
app.use("/", logintRouter);
app.use("/register", registerRouter);

app.use("/dashboard", dashboardRouter);
app.use("/dashboard/profile", dashboardRouter);
app.use("/dashboard/feed", dashboardRouter);
app.use("/dashboard/forum", dashboardRouter);
app.use("/dashboard/report", dashboardRouter);
app.use("/dashboard/config", dashboardRouter);

app.use("/dashboard/createPost", dashboardRouter);
app.use("/submitpost", dashboardRouter);

app.use("/deletePost:id", dashboardRouter);
app.use("/editPost:id", dashboardRouter);

app.use('/dashboard/search', dashboardRouter);
app.use("/userView", dashboardRouter);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));