const express = require("express");
const cors = require("cors");

const routes = require("./src/routes/routes");
const authRoute = require("./src/routes/authRoute");
const userRouter = require("./src/routes/userRoute");

const app = express();
const port = 2000;

app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
app.use(authRoute);
app.use(routes);
app.use(userRouter);

app.listen(port, () => {
  console.log("server is running at", port);
});
