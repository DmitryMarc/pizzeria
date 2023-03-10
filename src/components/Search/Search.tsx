import debounce from 'lodash.debounce';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchValue } from '../../redux/filter/filterSelectors';
import { setSearchValue } from '../../redux/filter/filterSlice';
import styles from './Search.module.scss';

const Search: FC = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(selectSearchValue);
    const [value, setValue] = useState(searchValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(searchValue);
    }, [searchValue])

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 500), []
    );

    const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
        setValue(evt.target.value);
        updateSearchValue(evt.target.value);
    }

    return (
        <div className={styles.root} >
            <svg className={styles.icon} fill="none" height="24" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
            <input ref={inputRef} onChange={onChangeInput} value={value}
                className={styles.input} placeholder="Search"></input>
            {value &&
                <svg className={styles.clearIcon} onClick={onClickClear} id="Livello_1"
                    viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title />
                    <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
                    <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
                </svg>
            }
        </div>
    )
}

export default Search;
