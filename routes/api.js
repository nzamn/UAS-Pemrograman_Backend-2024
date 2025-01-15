// import PatientController
const PatientController = require("../controller/PatientController");
// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index);
router.post("/patients", PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get("/patients/:id", PatientController.show);

// export router
module.exports = router;