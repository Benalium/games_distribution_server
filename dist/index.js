var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cors from 'cors';
import express from 'express';
import fs from 'fs/promises';
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello!');
});
app.get('/api/data', (req, res) => {
    const jsonData = {
        message: 'JSON respond example',
        status: 'success',
        timestamp: new Date().toISOString()
    };
    res.json(jsonData);
});
app.post("/login", (req, res) => {
    console.log("Received:", req.body);
    res.json({ success: true, received: req.body });
});
// Add product //
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received:", req.body);
    const newProduct = req.body;
    const filePath = 'products.json';
    const data = yield fs.readFile(filePath, 'utf8');
    const products = JSON.parse(data);
    products.push(newProduct);
    yield fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');
    res.json({ success: true, received: req.body });
}));
// Get products //
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = 'products.json';
    yield fs.readFile(filePath);
    const data = yield fs.readFile(filePath, 'utf8');
    const products = JSON.parse(data);
    res.json(products);
}));
// Server //
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
