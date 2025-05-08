"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
router.use((0, cookie_parser_1.default)());
let users = [];
function authenticateToken(req, res, next) {
    const authCookie = req.cookies["authcookie"];
    if (authCookie == null) {
        res.status(401).send("unauthorized request");
        return;
    }
    jsonwebtoken_1.default.verify(authCookie, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err || !decoded || typeof decoded === "string") {
            res.sendStatus(403);
            return;
        }
        let { email, username } = decoded;
        req.user = { email, username };
        next();
    });
}
router.get("/me", authenticateToken, (req, res) => {
    res.json(req.user);
    console.log(users);
});
router.post("/register", (req, res) => {
    const { email, username, password } = req.body;
    let check = users.find((ele) => ele.email == email);
    if (check) {
        res.status(400).send("Already Exits");
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email, username }, process.env.ACCESS_TOKEN);
    users.push({ email, username, password });
    res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: "User Registered Successfully", token });
    console.log(users);
});
router.post("/login", (req, res) => {
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
    const token = jsonwebtoken_1.default.sign({ username }, process.env.ACCESS_TOKEN);
    res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: "User Logged in successfully", token });
    console.log(users);
});
exports.default = router;
