require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");
const attemptConnnection = require("./config/db.config");
const stopBackendMiddleware = require("./middlewares/dangerous.middleware");
const {
  notFoundMiddleware,
  internalServerErrorMiddleware,
} = require("./middlewares/errors.middleware");
const todoRoutes = require("./routes/todo.route");
const userRoutes = require("./routes/user.route");
const paymentRoutes = require("./routes/payment.route");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware stack
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later.",
});
app.use(limiter);

// Connct to MongoDB
attemptConnnection();

// API Routes
app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is Live" });
});
// app.use("/todo", todoRoutes);
app.use("/auth", userRoutes);
// app.use("/payment", paymentRoutes);

// Middleware
app.post("/dangerous/stop/backend", stopBackendMiddleware);
app.use(notFoundMiddleware);
app.use(internalServerErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
