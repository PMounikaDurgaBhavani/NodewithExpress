import express, { Request, Response, NextFunction } from "express";
import bookdetails from "./routes/book";
import array from "./routes/array";
import presentTime from "./routes/time";
import cookieDetails from "./routes/cookie";
import authentication from "./routes/auth";
import admin from "./routes/admin";

const app = express();

app.use("/book", bookdetails);
app.use("/array", array);
app.use("/time", presentTime);
app.use("/cookie", cookieDetails);
app.use("/auth",authentication);
app.use("/admin",admin,(req,res)=>{
  res.sendStatus(401);
})
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
