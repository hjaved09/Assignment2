const express = require("express")
const router = express. Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const liser = require(". ./models/User");
const { forwardAuthenticated} = require(",./config/auth");
let authController = require("../controllers/auth");
router.get ("/login", forwardAuthenticated, authController. login);
router.get ("/register", forwardAuthenticated, authController.register);
router.post ("/register", (req, res)=>
 {
//extract all variables
const { name, email, password, password2 } = req. body;
let errors =[];
//check required fields
if (name , email , password , password2) {
errors.push({msg: "please fill in all fields !" });
}
//confirm password
if (password != password2)
{errors.push({ msg: "Passwords don't match" });
}
    if(password.lenght<6){
errors.push({ msg: "Password should be at least 6 characters" });
    }

    if(errors.length>0){
        res.render("register",{
            errors,
            name,
            email,
            password,
            password2
        });
    }
    