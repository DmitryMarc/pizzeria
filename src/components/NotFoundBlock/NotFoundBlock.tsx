import { FC } from 'react';
import style from './NotFoundBlock.module.scss'
const NotFoundBlock:FC = () => {
    return (
        <div className={style.root}>
            <h1>
                <span>😕</span>
                <br />
                Not Found
            </h1>
            <p className={style.description}>К сожалению, эта страница недоступна в нашем интернет-магазине.</p>
        </div>
    )
}

export default NotFoundBlock;