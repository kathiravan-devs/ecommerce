import axios from "axios";
import { useRef, useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartProduct({ cartItem, loadCart }) {

    const [isEditingQuantity, setIsEditingQuantity] = useState(false);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const saveInputRef = useRef(null);

    function updateQuantity() {
        setIsEditingQuantity(true);
    }

    async function saveQuantity() {
        const newQuantity = Number(saveInputRef.current.value);

        if (!Number.isInteger(newQuantity) || newQuantity < 1) {
            alert("Quantity must be a whole number, at least 1.");
            return;
        }

        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: newQuantity
        });

        await loadCart();
        setIsEditingQuantity(false);
    }


    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className={`cart-item-details ${isEditingQuantity ? "update-cart-item-details" : ""}`}>
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span className="quantity-label-container">
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span className="save-quantity-link link-primary">
                        <input
                            type="number"
                            min='1'
                            className="quantity-input"
                            defaultValue={cartItem.quantity}
                            ref={saveInputRef}
                        />
                        <span onClick={saveQuantity} >
                            Save
                        </span>
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div >
        </>
    );
}