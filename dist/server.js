"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("./routes/book"));
const array_1 = __importDefault(require("./routes/array"));
const app = (0, express_1.default)();
app.use("/book", book_1.default);
app.use("/array", array_1.default);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
