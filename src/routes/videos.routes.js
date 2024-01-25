const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json("hola desde videos");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
