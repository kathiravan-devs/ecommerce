import axios from "axios";
import dayjs from "dayjs";
import { useState, Fragment } from "react";
import { Link } from "react-router";


export function OrdersDetailsGrid({ order, loadCart }) {

    const [addedProductId, setAddedProductId] = useState(null);

    
    const addToCart = async (product, quantity) => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
        });
        await loadCart();
        setAddedProductId(product.id);
        setTimeout(() => {
            setAddedProductId(null);
        }, 3500);
    };

    return (
        <div className="order-details-grid">
            {
                order.products.map((orderedProduct) => {
                    const isBuyed = addedProductId === orderedProduct.product.id;
                    return (
                        <Fragment key={orderedProduct.product.id}>

                            <div className="product-image-container">
                                <img src={orderedProduct.product.image} />
                            </div>

                            <div className="product-details">
                                <div className="product-name">
                                    {orderedProduct.product.name}
                                </div>
                                <div className="product-delivery-date">
                                    Arriving on: {dayjs(orderedProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                </div>
                                <div className="product-quantity">
                                    Quantity: {orderedProduct.quantity}
                                </div>
                                <button 
                                    type="button"
                                    className={`buy-again-button button-primary ${isBuyed ? "buyed" : ""}`}
                                    onClick={() => addToCart(orderedProduct.product, orderedProduct.quantity)}>
                                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                    <span className="buy-again-message">
                                        Add to Cart
                                    </span>
                                    <img className="buyed-icon" src="images/icons/checkmark-white.png" />
                                    <span className="buyed-message">
                                        Added
                                    </span>
                                </button>
                            </div>

                            <div className="product-actions">
                                <Link to={`/tracking?orderId=${order.id}`}>
                                    <button className="track-package-button button-secondary">
                                        Track package
                                    </button>
                                </Link>
                            </div>

                        </Fragment>
                    );
                })
            }

        </div>
    );
}