import app from "./app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import cloudinary from "cloudinary";
import Stripe from "stripe";

export const stripe = new Stripe(config.stripe_secret);

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_key,
  api_secret: config.cloud_secret,
});

const startServer = async () => {
  await connectDB();
  const port = config.port || 8000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}, in ${config.env} MODE`);
  });
};

startServer();
