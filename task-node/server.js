const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server app listening on port ${PORT}!`)
    );
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
    process.exit();
  });
