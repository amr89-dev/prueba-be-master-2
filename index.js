require("dotenv").config();
const createServer = require("./src/app.js");
const asociations = require("./src/db/associations.js");
const db = require("./src/db/db.js");
const loadSeeds = require("./src/db/seed/loadSeeds.js");

const PORT = process.env.PORT || "3000";

const main = async () => {
  try {
    await db.authenticate();
    asociations();
    await db.sync({ force: false });
    console.log("The database connection has been successful.");
    await loadSeeds();
    const server = await createServer();
    server.listen(PORT, () => {
      console.log(`Server raised on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
