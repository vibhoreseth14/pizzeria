var express=require('express');
var bp=require('body-parser');
var mc=require('mongodb').MongoClient;
var client=new mc("mongodb://localhost:27017",{useUnifiedTopology:true});
var app=express();

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

const Stripe = require("stripe");
const stripe = Stripe("Please insert your own secret key here");

app.use((req, res,next)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.get("/displaypizza",(req,res)=>{
    client.connect((err)=>{
        if(err) {console.log("Couldn't connect to db",err); }
        else{
            console.log("connected to Db..");
            var db=client.db("Pizzeria");
            var pizza=db.collection("pizza");
            pizza.find().toArray((err,docs)=>{
                if(err) console.log("no pizza founds!");
                else{
                    console.log("pizza recieved from db..");
                    res.send(docs);
                 }
            });  
        } 
    });
    
});

app.get("/displayingredients",(req,res)=>{
    client.connect((err)=>{
        if(err){ console.log("Couldn't connect to db",err); }
        else{
            console.log("connected to Db..");
            var db=client.db("Pizzeria");
            var pizza=db.collection("ingredients");
            pizza.find().toArray((err,docs)=>{
                if(err){
                    console.log("no ingredients founds!");
                }
                else{
                    console.log("ingredients recieved from db..");
                    res.send(docs);
                }
            });
        } 
    });  
   
 });

 app.post('/addtocart',(req,res)=>{
    client.connect((err)=>{
        if(err) {console.log("Couldn't connect to db",err);}
        else{
            console.log("connected to Db..");
            var db=client.db("Pizzeria");
            var cart=db.collection('cart');
            cart.insertOne(req.body);
            res.send({message:"Success"});
        }
    });  
    
 });

 app.get("/displaycart",(req,res)=>{
    client.connect((err)=>{
        if(err) {console.log("Couldn't connect to db",err);}
        else{
            console.log("connected to Db..");
            var db=client.db("Pizzeria");
            var cart=db.collection('cart');
            cart.find().toArray((err,docs)=>{
                if(err){
                    console.log("no items founds!");
                }
                else{
                    console.log("cart items recieved from db..");
                    res.send(docs);
                }
            });
        } 
    });  
 });

 app.get("/clearcart",(req,res)=>{
    client.connect((err)=>{
        if(err) {console.log("Couldn't connect to db",err); }
        else{
            console.log("connected to Db..");
            var db=client.db("Pizzeria");
            var cart=db.collection('cart');
            cart.deleteMany();
            res.send({message:"Success"});
        }
    });  
 });

 app.post("/clearcartitem",(req,res)=>{
    client.connect((err)=>{
        if(err) {console.log("Couldn't connect to db",err); }
        else{
            console.log("connected to Db..");
            var db=client.db("Pizzeria");
            var cart=db.collection('cart');
            cart.deleteMany({name:req.body.name});
            res.send({message:"Success"}); 
        } 
    }); 
});

app.get("/gettotal",(req,res)=>{
    client.connect((err)=>{
        if(err) {console.log("Couldn't connect to db",err);}
        else{
            console.log("connected to Db..");
            var db=client.db("Pizzeria");
            var cart=db.collection('cart');
            cart.aggregate([{$group:{_id:null,carttotal:{$sum:"$price"}}}]).toArray((err,docs)=>{
                if(err){
                    console.log("no items founds!");
                }
                else{
                    console.log("cart total");
                    res.send(docs);
                }
            }); 
        }
    });  
});


 app.listen(3000,()=>{
     console.log("server started..");
 });

 app.post("/create-payment-intent", (req, res) => {
    stripe.paymentIntents.create(
      {
        amount:(req.body.amount),
        currency:"INR",
        payment_method_types: ["card"],
        description: 'Software development testing',
      },
      function (err, paymentIntent) {
        if (err) {
          res.status(500).json(err.message);
        } else {
          res.status(201).json(paymentIntent);
        }
      }
    );
  });
