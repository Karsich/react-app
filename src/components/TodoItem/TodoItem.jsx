import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {useDeleteTodoItem} from '../../data/hooks/useData';

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  min-width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({ id, title, checked, priority }) => {
  const { mutate: deleteTodoItem } = useDeleteTodoItem();

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm(`Удалить элемент "${title}" (ID: ${id}, приоритет: ${priority})?`);
    if (isDelete) {
      deleteTodoItem({ id });
    }
  };

  return (
    <TodoItemContainer>
      <TodoItemCheckbox checked={checked} id={id} disabled={false} priority={priority}/>
      <Title checked={checked}>
        {title}
      </Title>
      <Delete onClick={handleDelete} />
    </TodoItemContainer>
  );
};