const path = require('path');
const port = 5000;
const fs = require('fs');
const fsPromise = require('fs').promises;

const express = require('express');
const bodyParser = require('body-parser');



const{check,validationResult}= require("express-validator");
const app = express();
app.set('view engine','ejs')

const urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/',(req,res)=>{
    res.render('index')
});

// app.post('/',(req,res)=>{
//     res.redirect('/dashboardindex')
// });



app.get('/register',(req,res)=>{
    res.render('register')
});



// app.post('/', function(req, res) {
//     // Your logic and then redirect
//     res.redirect('/dashboard');
//   });

  app.get('/event',(req,res)=>{
    res.render('event')
});


//---------Dashboard---------

app.get('/dashboard', function(req, res) {
// Your logic and then redirect
fs.readFile('./products.json', (err,data) => {
    res.render('dashboard', {
       key: JSON.parse(data)
    })
});

});


app.post('/register', urlencodedParser, async (req,res)=>{
    var data=req.body;

    const json = await fsPromise.readFile('./products.json','utf8');

    const myJson = json ? JSON.parse(json) : [];

    // data = fs.readFileSync('products.json', data , finished);
    // function finished (err) {
    //     console.log('all set')
    // }

    const myData = [...myJson, data];

    const words = JSON.stringify(myData, null, 2);

    fs.writeFile('products.json', words,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("written successful");
            res.redirect('/dashboard');
            console.log();
        }
    });
});
//---------EVENT---------

app.get('/dashboardevent', function(req, res) {
    // Your logic and then redirect
    fs.readFile('./event.json', (err,data) => {
        res.render('dashboardevent', {
           key1: JSON.parse(data)
        })
    });
    
    });
    
    
    
    
    app.post('/event', urlencodedParser, async (req,res)=>{
        var data1=req.body;
    
        const json1 = await fsPromise.readFile('./event.json','utf8');
    
        const myJson1 = json1 ? JSON.parse(json1) : [];
    
        // data = fs.readFileSync('products.json', data , finished);
        // function finished (err) {
        //     console.log('all set')
        // }
    
        const myData1 = [...myJson1, data1];
    
        const words1 = JSON.stringify(myData1, null, 2);
    
        fs.writeFile('event.json', words1,(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("written event successful");
                res.redirect('/dashboardevent');
                console.log();
            }
        });
    });
    
//---------INDEX---------

app.get('/dashboardindex', function(req, res) {
    // Your logic and then redirect
    fs.readFile('./index.json', (err,data) => {
        res.render('dashboardindex', {
           key2: JSON.parse(data)
        })
    });
    
    });
    
app.post('/', urlencodedParser, async (req,res)=>{
    var data2=req.body;

    const json2 = await fsPromise.readFile('./index.json','utf8');

    const myJson2 = json2 ? JSON.parse(json2) : [];

    // data = fs.readFileSync('products.json', data , finished);
    // function finished (err) {
    //     console.log('all set')
    // }

    const myData2 = [...myJson2, data2];

    const words2 = JSON.stringify(myData2, null, 2);

    fs.writeFile('index.json', words2,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("written index successful");
            res.redirect('/dashboardindex');
            console.log();
        }
    });
});


app.listen(port, () => console.log(`App listening on port ${port}`));