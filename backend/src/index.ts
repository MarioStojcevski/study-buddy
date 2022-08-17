import express from "express";
import router from "./routes/routes";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use("/", router);

app.listen(3001, () => {
  console.log("Backend server started.");
})