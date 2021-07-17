const functions = require("firebase-functions");
const express =require("express");
const cors =require("cors");
const stripe =require("stripe")
('sk_test_51J9U5ISH1ynDYM6PrqOyJVptYIWn1L1x98yDezmb91s7AiEUDCDkHd2YoqVRFLn7wGprx8D6f9GD4Vir7hG7QSgv00Rx1vlFyI')

//API

//App config
const app=express();

//Middlewares
app.use(cors({origin:true}));
app.use(express.json());

//API routes
app.get('/',(request,response)=>response.status(200).send('hello world'))

app.post('/payments/create',async(request,response)=>{
    try{
    const total=request.query.total;
    console.log('Payment Request Received BOOM!!!',total);

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,//subunits of the currency
        currency:"inr",
    });
    //OK-created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })}catch(error){
        response.status(500).json(error);
    }
})

//Listen Command

exports.api=functions.https.onRequest(app)
//Example Endpoint
//http://localhost:5001/e-commerce-916df/us-central1/api