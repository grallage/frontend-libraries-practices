import styled from 'styled-components'

import { StyleClosetTheme } from './Theme'

type ToggleProps = {
  theme: string
  toggleTheme: () => void
}

const Button = styled.button<{ theme: StyleClosetTheme }>`
  background: ${({ theme }) => theme.colors.background};
  background: ${(props) => props.theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`
const Toggle = ({ theme, toggleTheme }: ToggleProps) => {
  return <Button onClick={toggleTheme}>Switch Theme({theme})</Button>
}

export default Toggle
