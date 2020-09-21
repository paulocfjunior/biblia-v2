import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Book } from '../components/Book'
import { useParseRef } from '../hooks/useParseRef'
import { useBooks } from '../hooks/useVerse'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(250,250,250, 0.5);
  }

  body * {
    font-family: NunitoSans, sans-serif;
  }
`
const StyledContainer = styled.div``

const StyledVersionButton = styled.button`
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  margin-right: 5px;
  margin-bottom: 10px;
`

const StyledInput = styled.input`
  display: block;
  margin-bottom: 20px;
  font-size: 20px;
  border-radius: 6px;
  outline: none;
  border: 1px solid #555;
  padding: 4px 8px;
`

const Control: React.FC = () => {
  const [query, setQuery] = useState('1 t 01.10-11')
  const [version, setVersion] = useState('acf')
  const refParts = useParseRef(query)
  const bookCandidates = useBooks(refParts.book)

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <h1>Control</h1>
        <div>
          <StyledVersionButton onClick={(): void => setVersion('acf')}>ACF</StyledVersionButton>
          <StyledVersionButton onClick={(): void => setVersion('nvi')}>NVI</StyledVersionButton>
        </div>
        <StyledInput
          type="text"
          placeholder="ex. 1 jo 2.2"
          value={query}
          onChange={(e): void => setQuery(e.target.value)}
        />
        {bookCandidates.map((bookName) => (
          <Book key={bookName} bookName={bookName} version={version} verseRef={refParts.verse}></Book>
        ))}
      </StyledContainer>
    </>
  )
}

export default Control
