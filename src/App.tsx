import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import PreloaderForFullPizza from './components/FullPizzaBlock/Skeleton';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path='pizzeria/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={
            <Cart />
        } />
        <Route path='pizza/:id' element={
          <Suspense fallback={<PreloaderForFullPizza />}>
            <FullPizza />
          </Suspense>
        } />
        <Route path='*' element={
          <NotFound />
        } />
      </Route>
    </Routes>
  );
}

export default App;
