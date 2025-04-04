const express = require('express');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Configure CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://yourdomain.com"], // ✅ Allowed domains
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/quiz', quizRoutes);
app.use('/api/auth', authRoutes);

// ✅ Log all registered routes for debugging
const listRoutes = (app) => {
  console.log("✅ Registered Routes:");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`➡️ ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
    }
  });
};
listRoutes(app);

// ✅ Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// ✅ Start server after database connection
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB connection before starting
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error(`❌ Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

  } catch (err) {
    console.error(`❌ Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

startServer();
