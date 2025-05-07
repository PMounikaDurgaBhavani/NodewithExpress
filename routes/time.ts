import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      requestTime?: number;
    }
  }
}

const requestTime = function (req: Request, res: Response, next: NextFunction) {
  req.requestTime = Date.now();
  req.cookies
  next();
};

router.use(requestTime);

router.get("/", (req, res) => {
  let requestText = `Requested Time is : ${new Date(
    req.requestTime!
  ).toLocaleString()}`;
  res.send(requestText);
});

export default router;
