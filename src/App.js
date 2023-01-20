import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://63cae056f36cbbdfc76246cf.mockapi.io/items')
      .then(res => res.json())
      .then(jsonArray => setItems(jsonArray)
      )
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map(pizzasItem => {
                return <PizzaBlock key={pizzasItem.id} {...pizzasItem} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
