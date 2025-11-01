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
import {  MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from './app/config/config.js';

dotenv.config();
const app = express();

// ✅ ES Module এ __dirname fix করতে হবে
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Default Middleware
app.use(cors({
  origin: ['https://e-com-boni.vercel.app'], 
  credentials: true
}));

app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(xss());
app.use(hpp());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());

// 🔹 Rate Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

// 🔹 Cache Setting
app.set('etag', WEB_CACHE);

// 🔹 MongoDB Connection
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhalbrt.mongodb.net/${process.env.DB_NAME}`;
mongoose.connect(URI)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error("❌ Database Error:", err));

// 🔹 Routes (API)
app.use("/api", router);

// 🔹 Serve Frontend (Vite build folder)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// 🔹 React Router fallback route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});


export default app;