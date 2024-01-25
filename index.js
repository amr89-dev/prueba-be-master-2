require("dotenv").config();
const server = require("./src/app");
const asociations = require("./src/db/associations.js");
const db = require("./src/db/db.js");

const PORT = process.env.PORT || "3000";

const main = async () => {
  try {
    await db.authenticate();
    asociations();
    await db.sync({ force: false });
    console.log("The database connection has been successful.");

    server.listen(PORT, () => {
      console.log(`Server raised on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
