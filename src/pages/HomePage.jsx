import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import './HomePage.css'


export function HomePage() {

    const[products, setProucts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        axios.get('https://kathiravan-devs.github.io/api/products.json')
            .then((response) => {
                setProucts(response.data)
            })
            axios.get('/api/cart-items')
            .then((response) => {
                setCart(response.data);
            })
    },[])

    const productRef = useRef([]);

    function showAdded(index) {
        productRef.current[index].classList.add('added-product-container');
        setTimeout(() => {
            productRef.current[index].classList.remove('added-product-container');
        }, 4500)
    }

    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart}/>

            <div className="home-page">
                <div className="products-grid">
                    {
                        products.map((product, index) => {
                            return (
                                <div key={product.id} className="product-container"
                                    ref={(element) => {
                                        productRef.current[index] = element
                                    }}>
                                    <div className="product-image-container">
                                        <img className="product-image"
                                            src={product.image} />
                                    </div>

                                    <div className="product-name limit-text-to-2-lines">
                                        {product.name}
                                    </div>

                                    <div className="product-rating-container">
                                        <img className="product-rating-stars"
                                            src={`https://kathiravan-devs.github.io/api/images/ratings/rating-${product.rating.stars*10}.png`} />
                                        <div className="product-rating-count link-primary">
                                            {product.rating.count}
                                        </div>
                                    </div>

                                    <div className="product-price">
                                        ${(product.priceCents / 100).toFixed(2)}
                                    </div>

                                    <div className="product-quantity-container">
                                        <select>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>

                                    <div className="product-spacer"></div>

                                    <div className="added-to-cart show-added-to-cart ">
                                        <img src="images/icons/checkmark.png" />
                                        Added
                                    </div>

                                    <button className="add-to-cart-button button-primary" onClick={() => showAdded(index)} >
                                        Add to Cart
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}




/*

It is the another way to show added 

const [addedProduct, setAddedProduct] = useState(null);

function showAdded(index) {
    setAddedProduct(index);

    setTimeout(() => {
        setAddedProduct(null);
    }, 4500);
}



<div
    className={`product-container ${
        addedProduct === index ? "added-product-container" : ""
    }`}
></div>

*/