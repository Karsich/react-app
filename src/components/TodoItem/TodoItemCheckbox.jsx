import styled, { css } from "styled-components";
import { useUpdateTodoItem } from "../../data/hooks/useData";

const disabledCss = css`
  background-color: #e2e2e2;
  border-width: 0px;
`;

const checkedCss = css`
  background-image: url(assets/images/svg/todo-done.svg);
  background-position: center;
  background-repeat: no-repeat;
`;

const priorityLow = css`
  border-color: #00cc00; // Зеленая обводка
  background-color: #aaffaa; // Зеленый фон
`;

const priorityMedium = css`
  border-color: #ffcc00; // Желтая обводка
  background-color: #ffffaa; // Желтый фон
`;

const priorityHigh = css`
  border-color: #ff0000; // Красная обводка
  background-color: #ffaaaa; // Красный фон
`;

export const CheckboxContainer = styled.span((props) => {
  return `
    display: inline-block;
    min-width: 20px;
    height: 20px;
    border: 2px solid #c4c4c4;
    border-radius: 15px;
    cursor: pointer;
    ${props.disabled ? disabledCss : ""}
    ${props.checked ? checkedCss : ""}
    ${props.priority === "low" ? priorityLow : ""}
    ${props.priority === "medium" ? priorityMedium : ""}
    ${props.priority === "high" ? priorityHigh : ""}
  `;
});

export const TodoItemCheckbox = ({ id, disabled, checked, priority }) => {
  const { mutate: updateTodoItem } = useUpdateTodoItem();

  // Обработчик для левого клика (изменение статуса задачи)
  const handleCheckbox = () => {
    if (!disabled) {
      updateTodoItem({ id, checked: !checked, priority });
    }
  };

  // Обработчик для правого клика (изменение приоритета)
  const handleRightClick = (event) => {
    event.preventDefault(); // Предотвращаем появление контекстного меню браузера
    if (!checked || disabled) {
      // Циклически меняем приоритет: low → medium → high → low
      const newPriority =
        priority === "low"
          ? "medium"
          : priority === "medium"
          ? "high"
          : "low";
      updateTodoItem({ id, checked, priority: newPriority });
    }
  };

  return (
    <CheckboxContainer
      disabled={disabled}
      checked={checked}
      priority={priority}
      onClick={handleCheckbox}
      onContextMenu={handleRightClick} // Добавляем обработчик правого клика
    />
  );
};