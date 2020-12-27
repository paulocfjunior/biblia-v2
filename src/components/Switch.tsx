import React from 'react'
import styled, { SimpleInterpolation } from 'styled-components'

const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`

const CheckboxContainer = styled('div')<{
  checked: boolean
  colorChecked: string
  colorUnchecked: string
}>`
  display: flex;
  width: 50px;
  height: 30px;
  margin: 8px;
  padding: 4px;
  border-radius: 20px;
  transition: background-color 200ms ease-in-out;
  will-change: background-color;
  box-shadow: inset 0 0 4px -2px rgba(0, 0, 0, 0.8);
  overflow: hidden;

  input {
    display: none;
  }

  ${({ checked, colorChecked, colorUnchecked }): SimpleInterpolation =>
    `background: ${checked ? colorChecked : colorUnchecked};`}
`

const SwitchIndicator = styled('div')<{ checked: boolean }>`
  display: flex;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 5px -2px rgba(0, 0, 0, 0.7);
  transition: transform 200ms ease-in-out;

  ${({ checked }): SimpleInterpolation =>
    checked
      ? `
    transform: translateX(20px);
  `
      : `
    transform: translateX(0px);
  `}
`

type SwitchProps = {
  checked?: boolean
  handleClick: () => void
  colorChecked?: string
  colorUnchecked?: string
  labelChecked?: string
  labelUnchecked?: string
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  handleClick,
  colorChecked = '#00f',
  colorUnchecked = '#fff',
  labelChecked = '',
  labelUnchecked = '',
}) => {
  return (
    <SwitchContainer>
      {labelUnchecked && <span>{labelUnchecked}</span>}
      <CheckboxContainer checked={checked} colorChecked={colorChecked} colorUnchecked={colorUnchecked}>
        <SwitchIndicator checked={checked} />
        <input type="checkbox" checked={checked} onClick={handleClick} />
      </CheckboxContainer>
      {labelChecked && <span>{labelChecked}</span>}
    </SwitchContainer>
  )
}
