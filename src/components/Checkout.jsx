import Modal from "./UI/Modal";
import CartContext from "./CartContext";
import { useContext } from "react";
import { currencyFormat } from "../util/currencyFormat";
import Input from "./UI/Input";
import UserProgressContext from "./UserProgressContext";
import Button from "./UI/Button";

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const totalPrice = cartCtx.items.reduce((totalP, item) => totalP + item.quantity * item.price, 0);

    const userProgressCtx = useContext(UserProgressContext);

    function handleShowCheckOut(){
        userProgressCtx.showCheckout();
    }

    function handleHideCheckOut(){
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(e){
        e.preventDefault();

        const fd = new FormData(e.target);
        const cusData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: cusData
                }
            })
        });

        userProgressCtx.hideCheckout();
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormat.format(totalPrice)} </p>

                <Input label="Full name" type="text" id="name"/>
                <Input label="Email address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>

                <div className="control-row">
                    <Input label="Postal code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>  
                </div>

                <p className="modal-actions">
                    <Button textOnly={true} onClick={handleHideCheckOut} >Close</Button>
                    <Button onClick={handleShowCheckOut}>Submit order</Button>
                </p>
            </form>
        </Modal>
    )
}