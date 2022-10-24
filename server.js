let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config,env"});
let logger = require("morgan");
let session = require("express-session");
let passport = require("passport");
const flash = require("connect-flash");

require("./config/passport") (passport);
//APP INIT
let app = express();
let PORT = process.env. PORT || 4000;
//DB CONFIG
const db = process.env.MONGO_URI;
//connect to mongo
 mongoose
.connect (db, {useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(  ()=>{
    console.log("Mongo DB connected..");
})
.catch(()=> console.log(err));
app.set("view",path.join(__dirname,"./views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}));

app.use(
    session({
        secret:"secret",
        resave:true,
        saveUninitialized:true,

    })

);
app.use(logger("dev"));
app.use(express.json());

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg=req.flash("error");
    next();
});
app.use(express.static(path.join(__dirname,"./public")));
app.use(express.static(path.join(__dirname,"./node_modules")));
app.use(
    "/dashboard/css",
    express.static(path.resolve(__dirname,"assest/css"))
);

app.use(
    "/dashboard/javascripts",
    express.static(path.resolve(__dirname,"public"))
);

app.use("/dashboard",express.static(path.resolve(__dirname, "./public")));
app.use("/users",express.static(path.resolve(__dirname, "./public")));
app.use("/dashboard",express.static(path.resolve(__dirname, "./node_modules")));
app.use("/users",express.static(path.resolve(__dirname, "./node_modules")));

app.use("/",require("./routes/index"));
app.use("/users",require("./routes/users"));
app.use("/dashboard",require("./routes/contact"));

app.listen(PORT,()=>{
    console.log('Server is running on port ${PORT}');
});

