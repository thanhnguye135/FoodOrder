import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals(){
    const [loadMeals, setLoadMeals] = useState([]);

    useEffect(() => {
        async function fetchMeal(){
            const res = await fetch('http://localhost:3000/meals');
    
            const data = await res.json();
            setLoadMeals(data);
        }
    
        fetchMeal();
    }, [])

    

    return (
        <ul id="meals">
            {loadMeals.map(meal => (<MealItem key={meal.id} meal={meal}/>))}
        </ul>
    );
}