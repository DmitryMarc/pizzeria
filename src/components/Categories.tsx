import { FC } from "react";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

type CategoriesPropsType = {
  categoryId: number
}
const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

const Categories: FC<CategoriesPropsType> = ({categoryId}) => {
  const dispatch = useDispatch();
  
  const onClickCategory = (index: number) => {
    dispatch(setCategoryId(index))
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) => {
            return <li onClick={() => onClickCategory(index)} key={index}
              className={categoryId === index ? "active" : ''}>{category}</li>
          })
        }
      </ul>
    </div>
  )
}

export default Categories;