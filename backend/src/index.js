import "dotenv/config";
import app from "./App.js";
import { connectDb } from "./database/connect.js";

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully.");
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });