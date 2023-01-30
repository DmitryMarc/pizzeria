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
            <div className="pizza__wrapper">
            <img className="pizza__wrapper--img" src={pizza.imageUrl} />
            <h2 className="pizza__wrapper--title">{pizza.title},</h2>
            <h4 className="pizza__wrapper--price">{pizza.price} ₽</h4>
            <p className="pizza__wrapper--description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, veritatis! Deserunt fugit, placeat cumque, eius accusantium nostrum sit odio libero suscipit labore eveniet quaerat nesciunt laborum, quam saepe vel sapiente?</p>
            </div>
        </div>
    )
}

export default FullPizza;
