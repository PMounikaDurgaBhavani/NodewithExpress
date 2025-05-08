"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use((req, res, next) => {
    if (!req.headers['x-auth']) {
        return next('route');
    }
    next();
});
router.get("/user/:id", (req, res) => {
    res.send("Hello User!");
});
exports.default = router;
