import React, { useState } from 'react'
import styled from 'styled-components'
import { Book } from '../components/Book'
import { SearchInput } from '../components/SearchInput'
import { Switch } from '../components/Switch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useParseRef } from '../hooks/useParseRef'
import { useBooks } from '../hooks/useVerse'

const SearchSectionContainer = styled.section`
  display: flex;
  flex-flow: column;
  width: 40vw;
  padding: 40px;
`

export const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('1 t 01.10-11')
  const [version, setVersion] = useLocalStorage('version', 'acf')
  const refParts = useParseRef(query)
  const bookCandidates = useBooks(refParts.book)
  const [, setSavedVerse] = useLocalStorage('verse')

  const handleSetVersion = (): void => {
    if (version === 'acf') {
      setVersion('nvi')
    } else {
      setVersion('acf')
    }
  }

  return (
    <SearchSectionContainer>
      <SearchInput query={query} setQuery={setQuery} />
      <Switch checked={version === 'acf'} handleClick={handleSetVersion} labelChecked="ACF" labelUnchecked="NVI" />
      {bookCandidates.map((bookName) => (
        <Book
          key={bookName}
          bookName={bookName}
          version={version}
          verseRef={refParts.verse}
          onChange={(verse): void => setSavedVerse(verse)}
        ></Book>
      ))}
    </SearchSectionContainer>
  )
}
