var express         = require('express'),
    app             = express(),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash');
    LocalStrategy   = require("passport-local");

    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));
    app.use(methodOverride("_method")); 
    app.use(flash());   

    var port = process.env.PORT || 7700;

 mongoose.connect("mongodb+srv://hacktoberfest:hacktoberfest@hacktoberfest.2tevb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser :true,
  useUnifiedTopology: true
}).then(() =>{
  console.log("mongodb connected");
}).catch(err =>{
  console.log("ERROR", err.message);
});

app.use(require("express-session")({
    secret : 'you cannot access without auth',
    resave : false,
    saveUninitialized : false
   }));


const User = require("./models/user");
const Post = require("./models/post");
   

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
   

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/login",(req,res)=>{
       res.render("login")
})

app.get("/register",(req,res)=>{
       res.render("register");
})

app.get("/dashboard",(req,res)=>{
       res.render("dashboard")
})

app.listen(port,()=>{
    console.log("Server connected on: " + port)
})