import React, { FC } from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setOrderType, setSortType } from "../redux/slices/filterSlice";

type SortItemType = {
  name: 'популярности' | 'цене' | 'алфавиту',
  sortProperty: 'rating' | 'price' | 'title'
}

export const listSort: SortItemType[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' }
];

type SortPropsType = {
  sortType: SortItemType,
  orderType: boolean
}

const Sort: FC<SortPropsType> = React.memo(({ sortType, orderType }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onClickListItem = (listItem: SortItemType) => {
    dispatch(setSortType(listItem));
    setIsOpen(false);
  }

  return (
    <div className="sort" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <div className="sort__label">
        <svg
          onClick={() => dispatch(setOrderType(!orderType))}
          transform={orderType ? 'rotate(-180 0 0)' : ''}
          width="15"
          height="9"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 
            5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 
            5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 
            0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 
            4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 
            4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      {isOpen &&
        <div className="sort__popup">
          <ul>
            {
              listSort.map((listItem, index) => {
                return <li key={index} onClick={() => onClickListItem(listItem)}
                  className={sortType.sortProperty === listSort[index].sortProperty
                    ? "active" : ''}>{listItem.name}</li>
              })
            }
          </ul>
        </div>
      }
    </div>
  )
})

export default Sort;