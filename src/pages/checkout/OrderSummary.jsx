import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartProduct } from "./CartProduct";


export function OrderSummary({ deliveryOptions, cart, loadCart }) {


    return (
        <div className="order-summary">

            {
                deliveryOptions.length > 0 && cart.map((cartItem) => {

                    const selectedDeliverOption = deliveryOptions
                        .find(deliveryOption => deliveryOption.id === cartItem.deliveryOptionId)

                    return (

                        <div key={cartItem.productId} className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date: {dayjs(selectedDeliverOption.estimatedDeliveryTimesMS)
                                    .add(`${selectedDeliverOption.deliveryDays}`, 'day')
                                    .format('dddd, MMMM D')}
                            </div>

                            <div className="cart-item-details-grid">

                                <CartProduct cartItem={cartItem} loadCart={loadCart} />

                                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                            </div>
                        </div>
                    );
                })

            }
            {
                cart.length === 0 && (
                    <div className="empty-message-container">
                    <span className="empty-message">
                        Cart is Empty! 
                    </span>
                    <button className="view-product button-primary">
                        View Products
                    </button>
                    </div>
                )
            }
        </div>
    );
}