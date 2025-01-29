import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './routes/user.js';
import customerRoute from './routes/customer.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7700;

const connect = async () => {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

app.get('/', (req, res) => { res.send('Hello from Express !'); });

app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    // optionsSuccessStatus: 200,
}));

app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/customers', customerRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connect();
});
