const express = require('express');
const hbs = require("hbs");
const fs = require("fs");
var app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine","hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use((req,res,next)=>{
    var now = Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFileSync("server.log", log + '\n');
    next();
})

// app.use((req,res,next)=>{
//     res.render("offline.hbs")
// })


app.get('/',(req,res)=>{

    res.send("Hello express");

})

app.get("/home",(req,res)=>{

    res.render("home.hbs",{
        pageTitle : "Home Page",
        thisYear : new Date().getFullYear(),
        welcomeMessage : "Welcome To Our Site and "
    })

})

app.get("/about",(req,res)=>{
res.render("about.hbs",{
    pageTitle : "About Us",
    thisYear : new Date().getFullYear()


});
})

app.listen(3000,()=>{
    console.log("Server Run On Port 3000");
});