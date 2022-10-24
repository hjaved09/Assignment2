const express=require("express");
const route= express.Router();
const { ensureAuhtenticated}=require("../config/auth");
const services = require("../services/contact");
const controller=require("../controller/contact");


route.get("/add-contact",ensureAuhtenticated,services.add_contact);

route.get("/update-contact",ensureAuhtenticated,services.update_contact);

route.get("/",ensureAuhtenticated,services.homeRouters);

route.post("/api/contact",controller.create);
route.get("/api/contact",controller.find);
route.put("/api/contact/:id",controller.update);
route.delete("/api/contact/:id",controller.delete);
module.exports=route;