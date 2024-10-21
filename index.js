const express = require('express');
const app = express();

const userdata =require('./models/usermodels');

/*const mongoose = require('mongoose');
mongoose.connect('ongodb+srv://sagar:sagar@atlascluster.tnx2t.mongodb.net/').then(()=>{
    console.log("connected to database");
}).catch((error)=> console.log(error)
);*/
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs')




app.get('/home',(req,res)=>{
    res.render('index');
})

app.get('/',(req,res)=>{
    res.render('login');
});

app.get('/register',(req,res)=>{
    res.render('register')
});

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/register',async(req,res)=>{
   
       
        let {username,email,password,cpassword}=req.body;
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{

                let user = await userdata.create({
                    username,
                    email,
                    password:hash
                    
                })
                let token = jwt.sign({email},"sagar");
                res.cookie("token",token)
                res.redirect('login');
                await user.save();
               console.log(user);
       

            })
        })
       

     
        
   
});


/*app.post('/register',(req,res)=>{
tart

let {password,cpassword} =req.body
userdata.push({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cpassword:req.body.cpassword

})
if(password===cpassword){
    res.redirect('login')
}else{
    res.send('password not match')
}
console.log(userdata);
});*/


app.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect('login');
});

app.post('/login',async(req,res)=>{
    
   let user = await userdata.findOne({email:req.body.email});
   let p= await userdata.findOne({password:req.body.password});
   if(!user) return res.send('something is wrong');
   bcrypt.compare(req.body.password, userdata.p,function(err,result){
    if(result){
        let token =jwt.sign({email:user.email},"sagar");
        res.cookie("token",token);
        res.send("yes you can login")
        res.redirect('index');


    }else{
        res.send("password is wrong");
    }
   })

   


})







app.listen(3000,()=>{
    console.log('server is connected');
});