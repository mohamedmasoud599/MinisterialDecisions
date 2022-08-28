import express, { Application } from "express";
import { config } from "dotenv";
import colors from "colors";
import morgan from "morgan";
import errorMiddleware from "./middlewares/errorMiddleware";
import connectDB from "./config/db";
import decisionsRoute from "./routes/decisionsRoute";
import usersRoute from "./routes/usersRoutes";
import cors from "cors";
import path from "path";
//clearing console on start/restart
console.clear();

//enabling colors string type extending
colors.enable();

//using  dotenv config
config();
const port = process.env.PORT;

//connecting to db
connectDB();

//express app
const app: Application = express();

//enabling cors
app.use(cors());

//express middlewares
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: false }));

//morgan requests logging middleware
app.use(morgan("dev"));

//server static frontend
app.use(express.static(path.join(__dirname, "../build/")));

//serve static files
app.use(express.static(path.join(__dirname, "../public/")));

//USING ROUTES
app.use("/api/decisions", decisionsRoute);
app.use("/api/users", usersRoute);

//error handle middleware
app.use(errorMiddleware);

//listening to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.blue.bold);
});
