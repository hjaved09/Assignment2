const LocalStrategy= require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const  User=  require("../models/user");

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField:"email"},(email,password,done)=>{
            User.findOne({email:email})
            .then(user)=>{
                if(!user){
                    return done(null,fasle{
                        message:"that message isnot register",
                    });
                }
                bcrypt.compare(password ,user.password,(err,isMatch)=>{
                    if(err)throw err;
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:"Incorrect Password"});

                    }
                });
            
        })
        .catch((err) =>console.log(err));

     } )
);

passport.seriallization((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((user,done)=>{
    User.findBvId(id.(err.user)=>{
done(err,user)
    });
})
