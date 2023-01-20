import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

import pizzasItems from './assets/pizzas.json'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzasItems.map(pizzasItem => {
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
