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

  const filteredBySearchItems = todoItems.filter((todoItem) => {
       const clearedTodoItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
       const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
       const isSearched = clearedTodoItemTitle.indexOf(clearedSearchValue)
       return (isSearched!==-1 || clearedSearchValue.length<3)
  })


  const todoItemsElements = filteredBySearchItems.map((item, index) => {
    return <TodoItem id={item.id} key={item.id} title={item.title} checked={item.isDone} />;
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={setSearchValue} />
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}