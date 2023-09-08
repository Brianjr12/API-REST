import express from "express";
import router from "./routes/routes.js";

const app = express();
app.use(express.json());
//*routes
app.use("/api", router);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Requested path not found",
  });
});

export default app;
