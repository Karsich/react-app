import React from 'react';
import styled from "styled-components"

const Root = styled.div`
  display: flex;
  overflow-wrap: anywhere;
  flex-direction: column;
  gap: 16px;
`;

export const TodoItemsContainer = (props) => { 
  return <Root>{props.children}</Root>
}