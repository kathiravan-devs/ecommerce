import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css';

function App() {
  const [products, setProucts] = useState([]);
  const [cart, setCart] = useState([])

  function loadCart() {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      })
  }


  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProucts(response.data)
      })
    loadCart();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<HomePage products={products} cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App
