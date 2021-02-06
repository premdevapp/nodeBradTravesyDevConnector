import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";

//config
import { keys } from "./config/keys.mjs";

//Port
const port = process.env.PORT || 4000;

//routes
import userRoutes from "./routes/api/users.mjs";
import profileRoutes from "./routes/api/profile.mjs";
import postsRoutes from "./routes/api/posts.mjs";
import pass from "./config/passport.mjs";

// app creation
const app = express();

//middleware config
// body parser for request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport
app.use(passport.initialize());
// passport config
pass(passport);

//connect to mongoDb
mongoose
  .connect(keys.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.error(error));

// use routes
app.use("/api/users", userRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/posts", postsRoutes);

// 404 page
app.use((req, res, next) => {
  return res.status(404).send("Hello welcome to devConnector!! page not found");
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`listen on http://localhost:${port}`);
});
