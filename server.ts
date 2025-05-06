import express from 'express';
import bookdetails from "./routes/book"
const app=express();

app.use("/book",bookdetails);

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})