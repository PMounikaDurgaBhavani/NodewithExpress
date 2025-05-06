import express from 'express';
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Get the book details");
});

router.post("/",(req,res)=>{
    res.send("Add the book details");
});

router.put("/",(req,res)=>{
    res.send("Update the book details");
});

router.delete("/",(req,res)=>{
    res.send("Delete the book details");
});

export default router;