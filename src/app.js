import app from './index.js';
import { PORT } from "./config.js";

//* starting the server
app.listen(PORT,() => {
  console.log(`server running on port ${PORT}`);
})