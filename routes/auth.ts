import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

let users: { username: string; email: string; password: string }[] = [];

function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const authCookie = req.cookies["authcookie"];
  if (authCookie == null) return res.status(401).send("unauthorized request");
  jwt.verify(
    authCookie,
    process.env.ACCESS_TOKEN as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    }
  );
}

router.get("/me", authenticateToken, (req: Request, res: Response) => {
  res.json(req.user);
});


router.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  let check=users.find(ele=>ele.email==email);
  if(check){
    return res.status(400).send("Already Exits")
  }
  const token = jwt.sign(
    { email, username },
    process.env.ACCESS_TOKEN as string
  );

  users.push({ email, username, password });
  res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: "User Registered Successfully", token });
  console.log(users);
});

router.post("/login", (req: Request, res: Response) => {
  const { username} = req.body;

  let check = users.find((ele) => ele.username === username);

  if (!check) {
    return res.sendStatus(401);
  }


  const token = jwt.sign(
    { username },
    process.env.ACCESS_TOKEN as string
  );
  res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: "User Logged in successfully", token });
  console.log(users);
});

export default router;
