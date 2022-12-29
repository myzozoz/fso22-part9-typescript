"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import diagnosesRouter from './routes/diagnoses';
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use(express_1.default.json());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.status(200).send('pong');
});
//app.use('/api/diagnoses', diagnosesRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
