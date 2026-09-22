import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css';

function App() {
  const [products, setProucts] = useState([]);
  const [cart, setCart] = useState([])

  async function loadCart() {
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
  }


  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products')
      setProucts(response.data)
    }
    getHomeData();
    loadCart();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<HomePage products={products} cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App
