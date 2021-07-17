import React from 'react'
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://wallpapercave.com/wp/wp3537549.jpg" alt=""/>
                <div className="home__row">
                    <Product
                    id="1" 
                    title="Lenovo Yoga 7 11th Gen Intel Core i7 14 (35.56cms) Full HD IPS 2-in-1 Touchscreen Laptop (16GB/512GB SSD/Windows 10/MS Office 2019/Fingerprint Reader/Slate Grey/Aluminium Surface/1.43Kg), 82BH004HIN" 
                    price={96004}
                    image="https://images-na.ssl-images-amazon.com/images/I/719CfPeuu5L._SL1500_.jpg"
                    rating={5}
                    />
                    <Product
                    id="2" 
                    title="IFB 6 kg 5 Star Fully-Automatic Front Loading Washing Machine (Diva Aqua SX, Silver, Inbuilt Heater, Aqua Energie water softener)" 
                    price={23490}
                    image="https://m.media-amazon.com/images/I/61F91pD42cL._AC_UL480_FMwebp_QL65_.jpg"
                    rating={4}
                    />
                </div>
                <div className="home__row">
                    <Product
                    id="3"  
                    title="OnePlus 9 Pro 5G (Pine Green, 12GB RAM, 256GB Storage)" 
                    price={69999}
                    image="https://m.media-amazon.com/images/I/612ytK4luvL._AC_UL480_FMwebp_QL65_.jpg"
                    rating={4}

                    />
                    <Product
                    id="4"  
                    title="USPA Men's Solid Regular T-Shirt (UDTSH0039_Blue Medium)" 
                    price={1327}
                    image="https://m.media-amazon.com/images/I/81vCa7YPVHL._AC_UL480_FMwebp_QL65_.jpg"
                    rating={5}

                    />
                    <Product
                    id="5"  
                    title="Man's Search For Meaning: The classic tribute to hope from the Holocaust by Victor E Frankl" 
                    price={188}
                    image="https://images-eu.ssl-images-amazon.com/images/I/61nTspM%2BBYL._AC_UL200_SR200,200_.jpg"
                    rating={4}

                    />
                    
                </div>
                <div className="home__row">
                    
                    <Product title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)" 
                    price={159900}
                    image="https://m.media-amazon.com/images/I/71MlcO29QOL._AC_UY327_FMwebp_QL65_.jpg"
                    rating={5}

                    />
                </div>
            </div>
        </div>
    )
}

export default Home
