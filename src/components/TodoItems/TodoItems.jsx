import React, { useState } from 'react';
import { TodoItemsContainer } from './TodoItemsContainer';
import { NewTodoItem } from '../TodoItem/NewTodoItem';
import { TodoItem } from '../TodoItem/TodoItem';
import { useData } from '../../data/hooks/useData';
import { SearchInput } from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  const { data: todoItems, isLoading } = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const normalizedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
    const normalizedTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();

    return normalizedSearchValue.length >= 3
      ? normalizedTitle.includes(normalizedSearchValue)
      : true;
  });

  const sortedItems = isSorted
    ? [...filteredBySearchItems].sort((a, b) => b.priority - a.priority)
    : filteredBySearchItems;

  const todoItemsElements = sortedItems.map((item) => {
    return (
      <TodoItem
        key={item.id}
        id={item.id}
        title={item.title}
        isDone={item.isDone}
        priority={item.priority || 1}
      />
    );
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={setSearchValue} />
      <button onClick={() => setIsSorted((prev) => !prev)}>
        {isSorted ? 'Убрать сортировку' : 'Сортировать по приоритету'}
      </button>
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  );
};
