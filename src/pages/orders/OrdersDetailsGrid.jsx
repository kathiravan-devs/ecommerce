import dayjs from "dayjs";
import { Fragment } from "react";
import { Link } from "react-router";


export function OrdersDetailsGrid({order}) {
    

    return (
        <div className="order-details-grid">
            {
                order.products.map((orderedProduct) => {

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
                                <button className="buy-again-button button-primary">
                                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                    <span className="buy-again-message">Add to Cart</span>
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