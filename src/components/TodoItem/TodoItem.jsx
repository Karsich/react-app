import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox'
import {useDeleteTodoItem, useToggleTodoItem, useUpdateTodoPriority} from '../../data/hooks/useData'

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span`
  flex: 1;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 15px;
  ${props => (props.isDone ? checkedCss : "")};
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
`;

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;


const PriorityButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: none;
  margin: 0 5px;
  cursor: pointer;

  background-color: ${({ priority }) => {
    if (priority === 1) return 'red';
    if (priority === 2) return 'yellow';
    return 'green';
  }};

  color: black;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

export const TodoItem = ({ id, title, isDone, priority }) => {
  const { mutate: deleteTodoItem } = useDeleteTodoItem();
  const { mutate: toggleTodoItem } = useToggleTodoItem();
  const { mutate: updateTodoPriority } = useUpdateTodoPriority();

  const handleCheckboxClick = () => {
    toggleTodoItem(id);
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteTodoItem(id);
    }
  };

  const handlePriorityClick = () => {
    const nextPriority = (priority % 3) + 1;
    updateTodoPriority({ id, priority: nextPriority });
  };

  return (
    <TodoItemContainer>
       <TodoItemCheckbox checked={isDone} onClick={handleCheckboxClick} />
        <Title checked={isDone}>{title}</Title>
      <PriorityButton priority={priority} onClick={handlePriorityClick}>
      </PriorityButton>
      <Delete onClick={handleDelete} />
    </TodoItemContainer>
  );
};