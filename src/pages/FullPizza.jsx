import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
    const [pizza, setPizza] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://63cae056f36cbbdfc76246cf.mockapi.io/items/${id}`);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
            }
        }

        fetchPizza();
    }, [])

    if (!pizza){
        return "Загрузка........."
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, veritatis! Deserunt fugit, placeat cumque, eius accusantium nostrum sit odio libero suscipit labore eveniet quaerat nesciunt laborum, quam saepe vel sapiente?</p>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza;
