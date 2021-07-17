import React,{useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise=loadStripe(
  "pk_test_51J9U5ISH1ynDYM6PXfQlLY9pe7b5iv67UOWvUoxBYhHwfn2ZQOFNrxgHAmaAqaFP8O2Ca0qa4PWGFhNqssthnfWx00OPWVPPNF"
);

function App() {
  const [{user},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      console.log('The user is:',authUser);

      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser
        });
      }else{
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
    <div>
    
    <Switch>
      <Route exact path="/">
        <Header />
        <Home/>
      </Route>
      <Route path="/orders">
        <Header/>
        <Orders/>
      </Route>
      <Route path="/checkout">
        <Header />
        <Checkout/>
      </Route>
      <Route path="/login">
       <Login/>
      </Route>
      <Route path="/payment">
      <Header/>
      <Elements stripe={promise}>
        <Payment/>
      </Elements>
      
      </Route>
    </Switch>
      
    </div>
    </Router>
  );
}

export default App;
