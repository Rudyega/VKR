import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import verifyRoutes from './routes/verify'

import session from 'express-session';

import uploadRoutes from './routes/upload';


dotenv.config();
console.log('MONGO_URI из .env:', process.env.MONGO_URI);
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // ← ОБЯЗАТЕЛЬНО!
}))
app.use(express.json());

console.log('🔥 index.ts загружен, подключаю authRoutes');

app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/auth/verify', verifyRoutes)
app.use('/api/posts', uploadRoutes);

app.use(session({
  secret: process.env.JWT_SECRET!,
  resave: false,
  saveUninitialized: false,
}));



mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server on http://localhost:5000'));
  })
  .catch((err) => console.error(err));
