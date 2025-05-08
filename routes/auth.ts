import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

interface payLoad {
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: payLoad;
    }
  }
}

var users: { username: string; email: string; password: string }[] = [];

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authCookie = req.cookies["authcookie"];
    if (authCookie == null) {
      res.status(401).send("unauthorized request");
      return;
    }
    jwt.verify(
      authCookie,
      process.env.ACCESS_TOKEN as string,
      (err, decoded) => {
        if (err) {
          return res.status(403).send("Unauthorized");
        }
        let { email, username } = decoded as payLoad;
        req.user = { email, username };
      }
    );
    next();
  } catch (error) {
    throw error;
  }
}

router.get("/me", authenticateToken, (req: Request, res: Response) => {
  res.json(req.user);
  console.log(users);
});

router.post("/register", (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  let check = users.find((ele) => ele.email == email);
  if (check) {
    res.status(400).send("Already Exits");
    return;
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

router.post("/login", (req: Request, res: Response): void => {
  const { username, password } = req.body;

  let check = users.find((ele) => ele.username === username);

  if (!check) {
    res.sendStatus(403);
    return;
  }
  if (check.password !== password) {
    res.status(401).send("Invalid Password");
    return;
  }

  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN as string);
  res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: "User Logged in successfully", token });
  console.log(users);
});

export default router;
