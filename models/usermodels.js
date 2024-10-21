const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sagar:sagar@atlascluster.tnx2t.mongodb.net/').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});
   


const userSchema =  mongoose.Schema({
    username:String,
    email:String,
    password:String,
    cpassword:String

})

const userdata =  mongoose.model('userdata',userSchema);
module.exports = userdata;
