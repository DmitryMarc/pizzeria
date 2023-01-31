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
            <p className={style.description}>Unfortunately, this page is not available in our online store.</p>
        </div>
    )
}

export default NotFoundBlock;