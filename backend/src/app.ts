import express from "express";
import router from "./routes/routes";
import cors from "cors";
import { ANSI_COLORS } from "./config/terminal-colors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", router);

app.listen(port, () => {
  console.log(ANSI_COLORS.GREEN,`Backend server started on port ${port}.`);
})