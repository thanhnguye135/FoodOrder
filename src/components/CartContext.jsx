import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
})

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existItem = state.items.findIndex((item) => item.id === action.item.id);
        const updateItems = [...state.items];

        if(existItem !== -1){
            const updateitem = {
                ...state.items[existItem],
                quantity: state.items[existItem].quantity + 1
            }

            updateItems[existItem] = updateitem;
        }else{
            updateItems.push({...action.item, quantity: 1});
        }

        return {...state, items: updateItems};
    }

    if(action.type === 'REMOVE_ITEM'){
        const existItem = state.items.findIndex((item) => item.id === action.id);
        const item = state.items[existItem];

        const updateItems = [...state.items];
        if(item.quantity === 1){
            updateItems.splice(existItem, 1);
        }else{
            const updateItem = {...state.items[existItem], quantity: state.items[existItem].quantity - 1};
            updateItems[existItem] = updateItem;
        }
        return {...state, items: updateItems};
    }

    return state;
}


export function CartContextProvider({children}){
    const [cart, dispatchCartAction  ] = useReducer(cartReducer, {items: []});

    
    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item})
    }
    
    function removeItem(id){
        dispatchCartAction({type: 'REMOVE_ITEM', id})
    }
    
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;