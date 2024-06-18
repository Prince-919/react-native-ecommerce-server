import app from "./app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
  await connectDB();
  const port = config.port || 8000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}, in ${config.env} MODE`);
  });
};

startServer();
