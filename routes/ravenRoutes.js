const express = require("express");
const router = express.Router();
const controller = require("../controller/ravenController");

router.get("/address", controller.getaddress);
router.post("/issue", controller.issueAssets);
router.post("/transfer", controller.transferAssets);
router.post("/transfered", controller.dummy);
router.post("/balance", controller.getbalance);
//router.post("/account", controller.getaccount);

module.exports = router;
