import React, { useState,useEffect } from 'react'
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link,useHistory} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import {db} from './firebase';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
function Payment() {

    const [{basket,user},dispatch]=useStateValue();
    const history=useHistory();
    const stripe=useStripe();
    const elements=useElements();

    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [clientSecret,setclientSecret]=useState();

    console.log(user);
    useEffect(()=>{
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret=async(req,res)=>{
            try{
                const response=await axios({
                method:'post',
                //stripe expects the total in a currencies subunits
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setclientSecret(response.data.clientSecret)
            }catch(error){
                console.log('error in getclientsecret',error);
            }
            
        }
        getClientSecret();
    },[basket]) 


    console.log('The secret is',clientSecret);

    const handleSubmit=async (event)=>{
        event.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent=payment confirmation
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type:'EMPTY_BASKET'
            })

            history.replace('/orders')
        })

    }

    const handleChange=event=>{
        setDisabled(event.empty);
        setError(event.error?event.error.message:"");
    }
    return (
        <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout(<Link to="/checkout">{basket?.length} items</Link>)
            </h1>

            <div className="payment__section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>Sathwik Residency</p>
                    <p>Hyderabad,Telangana.</p>
                </div>
            </div>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment__items">
                    {basket.map(item=>(
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                    ))}
                </div>
            </div>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                               <CurrencyFormat
                                    renderText={(value)=>(
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                    /> 
                                    <button disabled={processing||disabled||succeeded}>
                                        <span>{processing?<p>Processing</p>:"Order Now"}</span>
                                    </button>
                            </div>
                            {error&&<div>{error}</div>}
                        </form>
                </div>
            </div>
        </div>
            
        </div>
    )
}

export default Payment
