import { Link, useNavigate } from 'react-router';
import './Header.css';
import { useState } from 'react';

export function Header({ cart }) {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const totalQuantity = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

    function runSearch() {
        navigate(`/?productString=${searchInput}`);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') runSearch();
        if (event.key === 'Backspace') runSearch();
    }

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="header-link">
                        <img className="logo" src="images/logo-white.png" />
                        <img className="mobile-logo" src="images/mobile-logo-white.png" />
                    </Link>
                </div>

                <div className="middle-section">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button className="search-button" onClick={runSearch}>
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>
        </>
    );
}