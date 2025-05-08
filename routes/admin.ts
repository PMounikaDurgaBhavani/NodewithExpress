import express,{Request,Response,NextFunction} from 'express';
const router=express.Router();

router.use((req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers['x-auth']){
        return next('route');
    }
    next()
});

router.get("/user/:id",(req:Request,res:Response)=>{
    res.send("Hello User!");
})

export default router;