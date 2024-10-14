import express from 'express';
import 'dotenv/config';  // Load environment variables
import cors from 'cors';
import Routes from './routes/index.js';  // Importing main routes
import { authMiddleware, adminMiddleware } from './middleware/authMiddleware.js';  // Middleware for auth
import './models/index.js';  // Ensure MongoDB connection is established

const PORT = process.env.PORT || 8000;  // Use the port you've set or default to 8000
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://bright-cactus-65cc86.netlify.app', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Enable set cookie
};

// Middleware
app.use(cors(corsOptions));  // Allow CORS with specified options
app.use(express.json());  // Parse incoming JSON requests

// Mounting the main router for API routes
app.use('/api', Routes); // All API routes will now start with /api

// Admin route with middleware
app.use('/admin', authMiddleware, adminMiddleware, (req, res) => {
    res.send('Admin Access');  // Responding for admin access
});

// Health check route
app.get('/', (req, res) => res.send('Server is running'));  // Simple health check

// Start the server
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
