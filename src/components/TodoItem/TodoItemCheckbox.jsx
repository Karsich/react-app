import styled, {css} from "styled-components";
import {useUpdateTodoItem} from "../../data/hooks/useData";

const disabledCss = css`
  background-color: #E2E2E2;
  border-width: 0px;
`

const checkedCss = css`
  border-color: #00cc00;
  background-color: #aaffaa;
  background-image: url(assets/images/svg/todo-done.svg);
  background-position: center;
  background-repeat: no-repeat;
`

export const CheckboxContainer = styled.span(props => {
  return `
    display: inline-block;
    min-width: 20px;
    height: 20px;
    border: 2px solid #C4C4C4;
    border-radius: 15px;
    border-color: #00cc00;
    background-color: #aaffaa;
    cursor: pointer;
    ${props.disabled ? disabledCss : ''}
    ${props.checked ? checkedCss : ''}
  `;
});


export const TodoItemCheckbox = ({ id, disabled, checked }) => {
    const { mutate } = useUpdateTodoItem();
    const handleCheckbox = () => {

        if (!disabled) {
            mutate({ id, checked: !checked });
        }

    };
    return <CheckboxContainer disabled={disabled} checked={checked} onClick={handleCheckbox} />
}