require("dotenv").config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');


const mongodb = require("./config/mongo");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes")
const verifyJWT = require("./middleware/verifyJWT")

const app = express();


const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  origin: true,
}

app.use(cookieParser())
app.use(cors(corsOptions))


mongodb();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", authRoutes);

app.use("/admin", adminRoutes);
app.use(verifyJWT)


app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
