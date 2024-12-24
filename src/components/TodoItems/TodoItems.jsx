import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSorted, setIsSorted] = useState(false);
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
      if (clearedSearchValue.length >= 3) return clearedTodoItemTitle.includes(clearedSearchValue)
      else return true;
  })

  const sortedItems = isSorted
      ? [...filteredBySearchItems].sort((a, b) => b.priority - a.priority)
      : filteredBySearchItems;

  const todoItemsElements = filteredBySearchItems.map((item, index) => {
    return <TodoItem key={item.id} title={item.title} checked={item.isDone} priority={item.priority || 1}/>;
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} />
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}