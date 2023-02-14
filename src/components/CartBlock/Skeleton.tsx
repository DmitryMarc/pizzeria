import { FC } from "react";
import ContentLoader from "react-content-loader";

const PreloaderForCart: FC = () => (
    <div className="cart__item">
        <ContentLoader
            className="cart__item-skeleton"
            speed={2}        
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" />
        </ContentLoader>
    </div>
)

export default PreloaderForCart;