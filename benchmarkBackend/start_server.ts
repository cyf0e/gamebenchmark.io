import dotenv from "dotenv";
dotenv.config();
import app from "./server";
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
