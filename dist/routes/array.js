"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cb0 = function (req, res, next) {
    console.log("CB0");
    next();
};
const cb1 = function (req, res, next) {
    console.log("CB1");
    next();
};
router.get("/", [cb0, cb1], (req, res, next) => {
    console.log("All are called");
    next();
}, (req, res) => {
    res.send("array called successfully");
});
exports.default = router;
