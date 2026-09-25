import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from '../../components/CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';


export function CheckoutPage({ cart, loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    async function loadPayment() {
        const response = await axios.get('/api/payment-summary')
        setPaymentSummary(response.data)
    }


    useEffect(() => {
        const deliveryOptionData = async () => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data)
        }
        deliveryOptionData()
        loadPayment()
    }, [cart]);

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />

                </div>
            </div>


        </>
    );
}