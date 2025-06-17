const express = require("express");
const path = require("path");
const { connection } = require("./Configs/db");
const { userRouter } = require("./routes/user.routes");
const { cartRouter } = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const { sampleProductRouter } = require("./routes/sampleProduct.routes");
const { paymentRouter } = require("./routes/payment.routes");
const orderRouters = require("./routes/orderRouter");
const adminRoutes = require("./routes/admin");
const enquiryRoutes = require('./routes/enquiryRoutes');
const appointmentRouter = require("./routes/appointment.router");
const prescriptionRoutes = require('./routes/prescription.routes');

require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// API ROUTES
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/sampleproduct", sampleProductRouter);
app.use("/wishlist", wishlistRoutes);
app.use("/payment", paymentRouter);
app.use("/orders", orderRouters);
app.use("/admin", adminRoutes);
app.use("/enquiry", enquiryRoutes);
app.use("/appointments", appointmentRouter);
app.use("/prescriptions", prescriptionRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API IS Working');
});

// ✅ Fix: Use correct port variable and bind to 0.0.0.0
const PORT = process.env.PORT ;
app.listen(PORT, '0.0.0.0', async () => {
  try {
    await connection;
    console.log("✅ Connected to the DB");
  } catch (err) {
    console.error("❌ Trouble connecting to the DB", err);
  }
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});