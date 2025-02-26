import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');

  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  // Для проверки вхождения подстроки в строку нужно использовать indexOf
  const filteredBySearchItems = todoItems.filter((todoItem) => {
    // const clearedTodoItemTitle = очистка от пробелов + приведение к одному из регистров
    // const clearedSearchValue = очистка от пробелов + приведение к одному из регистров
    // const isSearched = проверка вхождения строки поиска в строку заголовка
    // return isSearched
    return true; // удалить после реализации фильтрации
  })


  const todoItemsElements = filteredBySearchItems.map((item, index) => {
    return <TodoItem key={item.id} title={item.title} checked={item.isDone} />;
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={setSearchValue} />
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}