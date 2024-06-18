import app from "./app.js";
import { config } from "./src/config/config.js";

const startServer = () => {
  const port = config.port || 8000;

  app.listen(port, () => {
    console.log(`Server listening on port ${port}, in ${config.env} MODE`);
  });
};

startServer();
