import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { envDetails } from "./config/env.js";

const app = express();

const { PORT } = envDetails;

app.use(express.json());

app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Trevlio API"); 
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
