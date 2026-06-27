import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authroutes from './src/Routes/Auth.js';
import connectDB from './src/Config/db.js'; // Note the explicit .js extension required in ES Modules

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: "Yousafzai Group API is running..." });
});

app.use('/api/auth', authroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 Server running on port ${PORT}`);
});