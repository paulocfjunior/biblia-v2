import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  display: block;
  margin-bottom: 20px;
  font-size: 20px;
  border-radius: 6px;
  outline: none;
  border: 1px solid #555;
  padding: 4px 8px;
`

type SearchInputProps = {
  query: string
  setQuery: (query: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  return (
    <StyledInput
      type="text"
      placeholder="ex. 1 jo 2.2"
      value={query}
      onChange={(e): void => setQuery(e.target.value)}
    />
  )
}
