"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Get the book details");
});
router.post("/", (req, res) => {
    res.send("Add the book details");
});
router.put("/", (req, res) => {
    res.send("Update the book details");
});
router.delete("/", (req, res) => {
    res.send("Delete the book details");
});
exports.default = router;
