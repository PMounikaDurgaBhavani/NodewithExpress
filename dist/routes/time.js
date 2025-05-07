"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    req.cookies;
    next();
};
router.use(requestTime);
router.get("/", (req, res) => {
    let requestText = `Requested Time is : ${new Date(req.requestTime).toLocaleString()}`;
    res.send(requestText);
});
exports.default = router;
