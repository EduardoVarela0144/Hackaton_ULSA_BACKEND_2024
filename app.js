require('dotenv').config()
const app = require("./server");
const port = app.get("port");

app.listen(port, () => {
  console.log(`Welcome to HackatonApi listening on port ${port}`);
});

