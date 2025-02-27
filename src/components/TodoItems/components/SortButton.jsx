import React, { useState } from "react";
import { TodoItemsContainer } from "./TodoItemsContainer";
import { NewTodoItem } from "../TodoItem/NewTodoItem";
import { TodoItem } from "../TodoItem/TodoItem";
import { useData } from "../../data/hooks/useData";
import { SearchInput } from "./components/SearchInput";
import { SortButton } from "./components/SortButton"; // Импортируем SortButton

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const { data: todoItems, isLoading } = useData();

  if (!todoItems || isLoading) {
    return <TodoItemsContainer>Загрузка данных...</TodoItemsContainer>;
  }

  // Фильтрация по поиску
  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedTodoItemTitle = todoItem.title.replace(/\s+/g, "").toLowerCase();
    const clearedSearchValue = searchValue.replace(/\s+/g, "").toLowerCase();
    const isSearched = clearedTodoItemTitle.indexOf(clearedSearchValue);
    return isSearched !== -1 || clearedSearchValue.length < 3;
  });

  // Сортировка по приоритету
  const sortedItems = [...filteredBySearchItems].sort((a, b) => {
    const priorityOrder = { default: 0, low: 1, medium: 2, high: 3 };

    if (sortOrder === "ascending") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOrder === "descending") {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else {
      return 0;
    }
  });

  // Обработчик для переключения порядка сортировки
  const handleSort = () => {
    setSortOrder((prev) => {
      if (prev === "default") return "ascending";
      if (prev === "ascending") return "descending";
      return "default";
    });
  };

  const todoItemsElements = sortedItems.map((item) => (
    <TodoItem
      key={item.id}
      id={item.id}
      title={item.title}
      checked={item.isDone}
      priority={item.priority}
    />
  ));

  return (
    <TodoItemsContainer>
      <SortButton sortOrder={sortOrder} onSort={handleSort} /> {/* Используем SortButton */}
      <SearchInput value={searchValue} setValue={setSearchValue} />
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  );
};