import express, { NextFunction } from 'express';
import cookieParser from 'cookie-parser';

const router=express.Router();

router.use(cookieParser());



router.get("/",(req,res)=>{
    console.log("Cookies: ",req.cookies);
    console.log("Signed Cookies: ",req.signedCookies);
})

export default router;