const mongoose =require("mongoose");
 var schema -new mongoose.Schema({
    name:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true,
        unique:true,

    },
    phone:{
        type:String,
        require:true,

    },

 });
 const contact=mongoose.model("Contact",schema);
 module.exports=contact;
