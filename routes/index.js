let express = require("express");
let router = express.Router();
let mainController= require("../controllers/index");

router.get("/projects", mainController.projects);

router.get("/about", mainController.about);


router.get("/services", mainController.services);
router.get("/contact", mainController.contact);

module.exports=router;