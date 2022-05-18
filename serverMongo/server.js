import express, { json } from "express";
import connectDB from "./database/connection";
import { urlencoded } from "body-parser";
import indexRouter from "./routes/index";
import mongoose from "mongoose";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import schema from "./Schemas/index";
import { graphqlHTTP } from "express-graphql";
const app = express();
app.use(json());

config({ path: "config.env" });
const PORT = process.env.PORT || 4001;
app.use(morgan("short"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//mongodb connection
connectDB();

//parse request to body-parser
app.use(urlencoded({ extended: true }));

//load routers
app.use("/", require("./routes/router"));
app.use("/", require("./routes/productsRouter"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
export default app.listen(PORT, () => console.log("Server Started"));
