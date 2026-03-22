// server.js
import app from "./app.js";

const port = 3000;
app.listen(port, "localhost", () => {
  console.log(`Server started on port ${port}, base urls for tests:`);
  console.log(
    `🚀 ${encodeURI(`http://localhost:${port}/users/`)}`,
    //`🚀 ${encodeURI(`http://localhost:${port}/tasks/`)}`,
    //`🚀 ${encodeURI(`http://localhost:${port}/profiles/`)}`,
  );
});
