// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import contactRoutes from "./routes/contactRoutes.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

// app.use("/api", contactRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import contactRoutes from "./routes/contactRoutes.js";

// dotenv.config();
// const app = express();

// // Parse JSON body
// app.use(express.json());

// // Allow frontend requests
// app.use(cors({
//    origin: [
//       "http://localhost:5173",
//     //   "https://securepi.pages.dev",
//     //   "https://securepi.in",
//     //   "https://www.securepi.in",
//     ],
//    // replace with your frontend URL
// }));

// // Routes
// app.use("/api", contactRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",          // local frontend
  "https://securepi.pages.dev",     // cloudflare pages
  "https://securepi.in",
  "https://www.securepi.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("SecurePi Backend is Live 🚀");
});

/* ---------- DATABASE ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/* ---------- ROUTES ---------- */
app.use("/api", contactRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
