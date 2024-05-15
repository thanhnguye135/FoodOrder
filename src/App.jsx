import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./components/CartContext";
import { UserProgressContextProvider } from "./components/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <main>
          <Meals />
          <Cart/>
          <Checkout/>
        </main>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
