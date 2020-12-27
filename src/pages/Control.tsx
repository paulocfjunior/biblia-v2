import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { VersePreview } from '../components/VersePreview'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SearchSection } from '../partials/SearchSection'
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

const StyledContainer = styled.div`
  display: flex;
`

const Control: React.FC = () => {
  const [savedVerse] = useLocalStorage('verse')

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <SearchSection />
        <VersePreview href="/verse" target="_blank">
          <Verse {...savedVerse} />
        </VersePreview>
      </StyledContainer>
    </>
  )
}

export default Control
