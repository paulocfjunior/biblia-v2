import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Book } from '../components/Book'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useParseRef } from '../hooks/useParseRef'
import { useBooks } from '../hooks/useVerse'
import Verse from './Verse'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(250,250,250, 0.5);
  }

  body * {
    font-family: NunitoSans, sans-serif;
    box-sizing: border-box;
  }
`
const StyledContainer = styled.div``

const StyledVersionButton = styled.button`
  border: none;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 10px;
  outline: none;
  cursor: pointer;
  border: 2px solid #333;
  background-color: #fff;
  font-weight: bold;
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;

  &:hover:not(:disabled) {
    background-color: #333;
    color: #fff;
  }
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

const VersePreview = styled.a`
  width: 1366px;
  height: 768px;
  position: fixed;
  bottom: 24px;
  right: 24px;
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.8);
  transition: transform 200ms ease-in-out;
  will-change: scale, translate;
  text-decoration: none;
  transform: scale(0.3) translate(1594px, 896px);

  > div {
    width: 100%;
    height: 100%;
  }

  &:active,
  &:hover,
  &:focus {
    transform: translate(274px, 154px) scale(0.6);
  }
`

const Control: React.FC = () => {
  const [query, setQuery] = useState('1 t 01.10-11')
  const [version, setVersion] = useState('acf')
  const refParts = useParseRef(query)
  const bookCandidates = useBooks(refParts.book)
  const [savedVerse, setSavedVerse] = useLocalStorage('verse')

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <h1>Control</h1>
        <div>
          {/* Switcher ?? */}
          <StyledVersionButton onClick={(): void => setVersion('acf')} disabled={version === 'acf'}>
            ACF
          </StyledVersionButton>
          <StyledVersionButton onClick={(): void => setVersion('nvi')} disabled={version === 'nvi'}>
            NVI
          </StyledVersionButton>
        </div>
        <StyledInput
          type="text"
          placeholder="ex. 1 jo 2.2"
          value={query}
          onChange={(e): void => setQuery(e.target.value)}
        />
        {bookCandidates.map((bookName) => (
          <Book
            key={bookName}
            bookName={bookName}
            version={version}
            verseRef={refParts.verse}
            onChange={(verse): void => setSavedVerse(verse)}
          ></Book>
        ))}
        <VersePreview href="/verse" target="_blank">
          <Verse {...savedVerse} />
        </VersePreview>
      </StyledContainer>
    </>
  )
}

export default Control
