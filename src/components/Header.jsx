import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "./CartContext";
import UserProgressContext from "./UserProgressContext";
export default function Header(){
    const cartCtx = useContext(CartContext);
    const totalItems = cartCtx.items.reduce((totalItem, item) => totalItem + item.quantity, 0);

    const userProgressCtx = useContext(UserProgressContext);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="logo food order" />
                <h1>reactfood</h1>
            </div>

            <nav>
                <Button textOnly={true} onClick={handleShowCart}>Cart ({totalItems})</Button>
            </nav>
        </header>
    )
}