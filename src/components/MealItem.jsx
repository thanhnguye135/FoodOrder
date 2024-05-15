import {currencyFormat} from '../util/currencyFormat';
import Button from './UI/Button';
import CartContext from './CartContext';
import { useContext } from 'react';

export default function MealItem({meal}){
    const cartCtx = useContext(CartContext);

    function handleAddMeal(){
        cartCtx.addItem(meal);
    }

    return (
        <li key={meal.id} className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt="image of meal" />
                    <div>
                        <h3>{meal.name}</h3>
                        <p className="meal-item-price">{currencyFormat.format(meal.price)}</p>
                        <p className="meal-item-desscription">{meal.description}</p>
                    </div>
                    <p className="meal-item-actions">
                        <Button onClick={handleAddMeal}>Add to Cart</Button>
                    </p>
            </article>
        </li>  
    )
}