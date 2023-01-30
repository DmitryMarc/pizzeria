import { useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

function Categories({categoryId}) {
  const dispatch = useDispatch();
  
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

  const onClickCategory = (index) => {
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