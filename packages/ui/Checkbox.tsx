import { useState, HTMLAttributes, ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenInput = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

type StyledCheckboxProps = HTMLAttributes<HTMLSpanElement> & {
  checked: boolean;
};

const StyledCheckbox = styled.span.attrs(() => ({
  role: "checkbox",
}))<StyledCheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 4px;
  font-size: 10px;
  text-decoration: underscore;
  background-color: ${({ checked, theme }) =>
    checked ? theme.primary : theme.primaryReversed};
  color: ${({ checked, theme }) =>
    checked ? theme.primaryReversed : theme.primary};
`;

const CheckboxLabel = styled.span`
  margin-left: 8px;
`;

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  label,
  checked: initialChecked = false,
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange && onChange(event);
  };

  return (
    <Container>
      <HiddenInput checked={checked} onChange={handleChange} />
      <StyledCheckbox checked={checked} aria-checked={checked}>
        {checked && "✓"}
      </StyledCheckbox>
      {label && <CheckboxLabel>{label}</CheckboxLabel>}
    </Container>
  );
};
