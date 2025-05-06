import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

const cb0 = function (req: Request, res: Response, next: NextFunction): void {
  console.log("CB0");
  next();
};

const cb1 = function (req: Request, res: Response, next: NextFunction): void {
  console.log("CB1");
  next();
};

router.get(
  "/",
  [cb0, cb1],
  (req: Request, res: Response, next: NextFunction) => {
    console.log("All are called");
    next();
  },
  (req: Request, res: Response) => {
    res.send("array called successfully");
  }
);

export default router;
