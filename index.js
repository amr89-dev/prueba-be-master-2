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
    console.log("La conexion a la base de datos es exitosa");

    server.listen(PORT, () => {
      console.log(`Servidor levantado en el puerto ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
