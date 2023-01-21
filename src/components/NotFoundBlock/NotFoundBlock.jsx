import style from './NotFoundBlock.module.scss'
const NotFoundBlock = () => {
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