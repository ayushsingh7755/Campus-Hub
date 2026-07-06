import "dotenv/config";
import { connectDb } from "./database/connect.js";
import app from "./App.js";

app.get("/", (req, res) => {
  res.send("Backend is running successfully.");
});

await connectDb();

export default app;