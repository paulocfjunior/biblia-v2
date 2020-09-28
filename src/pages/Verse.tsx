import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { useLocalStorage } from '../hooks/useLocalStorage'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  body * {
    font-family: NunitoSans, sans-serif;
  }
`

const ShowChapter = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
`

const ShowVerse = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  background-image: url('/landscape.webp');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  color: white;
  flex-flow: column;
  justify-content: center;
  align-content: center;
`

const ChapterContainer = styled.h1`
  padding: 24px;
  margin: 0 120px;
  font-weight: bold;
  opacity: 0;
  animation: ${ShowChapter} 200ms ease-out forwards;
  will-change: transform, opacity;
`

const VersesContainer = styled.div`
  font-size: 36px;
  text-align: justify;
  white-space: wrap;
  padding: 24px;
  margin: 0 120px;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  animation: ${ShowVerse} 200ms ease-in-out forwards;
  will-change: transform, opacity;

  span {
    font-family: Lora, serif;
  }
`

export type VerseProps = {
  book?: string
  chapter?: string
  verses?: {
    [number: number]: string
  }
}

const Verse: React.FC<VerseProps> = ({ book, chapter, verses }) => {
  const [{ book: savedBook, chapter: savedChapter, verses: savedVerses }] = useLocalStorage('verse')
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const currentBook = book || savedBook
  const currentChapter = chapter || savedChapter
  const currentVerses = verses || savedVerses

  useEffect(() => {
    setShouldAnimate(false)
    const timeoutId = setTimeout(() => setShouldAnimate(true), 1)

    return (): void => clearTimeout(timeoutId)
  }, [currentVerses])

  return (
    <Container>
      <GlobalStyle />
      {shouldAnimate && (
        <>
          <ChapterContainer>
            {currentBook} {currentChapter}
          </ChapterContainer>
          <VersesContainer>
            {currentVerses &&
              Object.entries(currentVerses).map(([number, text]) => (
                <span key={number}>
                  {number}&ensp;{text}&ensp;
                </span>
              ))}
          </VersesContainer>
        </>
      )}
    </Container>
  )
}

export default Verse
