const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const matchRoutes = require('./routes/matchRoutes');
const escrowRoutes = require('./routes/escrowRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const disputeRoutes = require('./routes/disputeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const searchRoutes = require('./routes/searchRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const skillTestRoutes = require('./routes/skillTestRoutes');

const app = express();

// --- Global middleware ---
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Serve uploaded files statically (dev convenience; use S3/Cloudinary in production)
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

// --- Health check ---
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// --- Route mounting (all 10 modules) ---
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);               
app.use('/api/match', matchRoutes);              
app.use('/api/escrow', escrowRoutes);            
app.use('/api/workspace', workspaceRoutes);      
app.use('/api/disputes', disputeRoutes);         
app.use('/api', portfolioRoutes);                
app.use('/api/search', searchRoutes);            
app.use('/api/notifications', notificationRoutes); 
app.use('/api/admin', adminRoutes);              
app.use('/api/skill-tests', skillTestRoutes);    

// --- 404 handler ---
app.all('*', (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// --- Global error handler (must be last) ---
app.use(errorHandler);

module.exports = app;
