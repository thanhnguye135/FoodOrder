import { currencyFormat } from "../util/currencyFormat";
import CartContext from "./CartContext"
import Button from "./UI/Button";
import Modal from "./UI/Modal"
import { useContext } from "react"
import UserProgressContext from "./UserProgressContext";
import CartItem from "./CartItem";

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    const userProgressCtx = useContext(UserProgressContext);

    function handleHideCart(){
        userProgressCtx.hideCart();
    }

    function handleCheckoutCart(){
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)} />
                ))}
            </ul>

            <p className="cart-total">{currencyFormat.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly={true} onClick={handleHideCart}>Close</Button>
                {cartCtx.items.length  > 0 && <Button onClick={handleCheckoutCart}>Go to checkout</Button>}
            </p>
        </Modal>
    )
}