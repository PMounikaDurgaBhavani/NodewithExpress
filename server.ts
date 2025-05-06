import express from "express";
import bookdetails from "./routes/book";
import array from "./routes/array";
const app = express();

app.use("/book", bookdetails);
app.use("/array", array);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
