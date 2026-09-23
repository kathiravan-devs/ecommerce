import { useParams } from 'react-router';
import axios from 'axios';
import { Header } from '../../components/Header';
import './TrackingPage.css'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {

    const [trackingOrder, setTrackingOrder] = useState(null);
    const [barWidth, setBarWidth] = useState(0);
    const [now] = useState(() => dayjs().valueOf());

    const params = useParams();
    const { orderId, productId } = params;

    useEffect(() => {
        const trackingOrderData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setTrackingOrder(response.data);
        }
        trackingOrderData();
    }, [orderId])

    const trackingProduct = trackingOrder?.products.find(
        (product) => product.productId === productId
    );

    let deliveryPercent = 0;
    if (trackingProduct) {
        const timePassedMs = now - trackingOrder.orderTimeMs;
        const totalDeliveryTimeMs = trackingProduct.estimatedDeliveryTimeMs - trackingOrder.orderTimeMs;
        deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
        if (deliveryPercent > 100) {
            deliveryPercent = 100;
        }
    }

    useEffect(() => {
        if (!trackingProduct) return;
        const timer = setTimeout(() => {
            setBarWidth(deliveryPercent > 5 ? deliveryPercent : 5);
        }, 100);
        return () => clearTimeout(timer);
    }, [trackingProduct, deliveryPercent]);

    if (!trackingOrder || !trackingProduct) return null;

    const deliveryDate = dayjs(trackingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D');
    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
            <title>Tracking</title>

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>

                    <div className="delivery-date">
                        {isDelivered ? 'Delivered on' : 'Arriving on'} {deliveryDate}
                    </div>

                    <div className="product-info">
                        {trackingProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {trackingProduct.quantity}
                    </div>

                    <img className="product-image" src={trackingProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${barWidth}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}