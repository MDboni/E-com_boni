import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/api.js';

dotenv.config();
const app = express();

// ✅ ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(hpp());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());

// 🔹 Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// 🔹 MongoDB connection
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhalbrt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.error("❌ Database Error:", err));

// 🔹 API Routes
app.use("/api", router);

// 🔹 Root route (backend live check)
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// 🔹 Serve frontend (Vite build)
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// 🔹 Start server (Vercel handles port)
const PORT = process.env.PORT || 5060;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
