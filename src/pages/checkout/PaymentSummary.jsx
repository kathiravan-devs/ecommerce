import axios from "axios";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function PaymentSummary({ paymentSummary, loadCart, cart }) {

    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const navigate = useNavigate();
    const isCartEmpty = cart.length === 0;

    const createOrder = async () => {
        if (isCartEmpty) {
            alert('Cart Is Empty! View Products.');
            navigate('/');
            return;
        }
        setIsPlacingOrder(true);
        try {
            await axios.post('/api/orders');
            await loadCart();
            navigate('/orders');
        } catch (err) {
            console.error(err);
            alert('Something went wrong placing your order.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="payment-summary">
            {
                paymentSummary && (
                    <>
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({paymentSummary.totalItems}):</div>
                            <div className="payment-summary-money">
                                {formatMoney(paymentSummary.productCostCents)}
                            </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                        </div>

                        <button className={`button-primary ${isCartEmpty === true ? "empty-place-order" : "place-order-button"}`} 
                            onClick={createOrder}
                            disabled={isPlacingOrder}>
                            Place your order
                        </button>
                    </>
                )
            }

        </div>
    );
}