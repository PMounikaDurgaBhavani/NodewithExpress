"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router = express_1.default.Router();
router.use((0, cookie_parser_1.default)());
router.get("/", (req, res) => {
    console.log("Cookies: ", req.cookies);
    console.log("Signed Cookies: ", req.signedCookies);
});
exports.default = router;
