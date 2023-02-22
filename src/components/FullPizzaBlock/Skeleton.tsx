import { FC } from "react";
import ContentLoader from "react-content-loader";

const PreloaderForFullPizza: FC = () => (
    <div className="pizza-block-wrapper">
        <ContentLoader
            speed={2}
            width={500}
            height={700}
            viewBox="0 0 500 700"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="250" cy="249" r="250" />
            <rect x="9" y="567" rx="10" ry="10" width="485" height="90" />
            <rect x="177" y="513" rx="10" ry="10" width="51" height="30" />
            <rect x="16" y="500" rx="25" ry="25" width="152" height="45" />
            <rect x="19" y="577" rx="10" ry="10" width="485" height="90" />
        </ContentLoader>
    </div>
)

export default PreloaderForFullPizza;