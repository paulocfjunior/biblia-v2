import React, { useContext } from 'react'
import styled from 'styled-components'
import { store as BookContext } from '../contexts/books'
import { ReferencePartType } from '../hooks/useParseRef'
import { useVerses } from '../hooks/useVerse'
import { VerseProps } from '../pages/Verse'

const StyledBook = styled.button`
  text-align: left;
  cursor: pointer;
  padding: 12px;
  margin: 0;
  border: none;
  background: rgba(240, 240, 240, 0.4);
  outline: none;
  box-shadow: 0 10px 20px -15px rgba(0, 0, 0, 0.5);
  transition: transform 100ms ease-in-out, box-shadow 100ms ease-in-out;
  will-change: transform, box-shadow;
  width: 100%;

  &:hover {
    box-shadow: 0 12px 20px -10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
`

const BookName = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`

const StyledVerse = styled.span`
  padding-right: 5px;
`

type BookProps = {
  bookName: string
  version: string
  verseRef: ReferencePartType
  onChange: (verse: VerseProps) => void
}

export const Book: React.FC<BookProps> = ({ bookName, version, verseRef, onChange }) => {
  const { state: books } = useContext(BookContext)
  const { chapter, verses } = useVerses(verseRef, bookName, version)

  if (!verses || Object.keys(verses).length === 0) {
    return null
  }

  const book = books ? books[bookName] : bookName.replace('.json', '')

  return (
    <StyledBook onClick={(): void => onChange({ book, chapter, verses })}>
      <BookName>
        {book} <strong>{chapter}</strong>
      </BookName>
      <div>
        {verses &&
          Object.entries(verses)?.map(([number, text]) => (
            <StyledVerse key={number}>
              {number} {text}
            </StyledVerse>
          ))}
      </div>
    </StyledBook>
  )
}
