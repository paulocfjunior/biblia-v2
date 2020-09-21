import { ReferencePartType } from './useParseRef'
import useSWR from 'swr'
import { useContext, useEffect } from 'react'
import { store as BooksContext } from '../contexts/books'

export const useBooks = (book: ReferencePartType): string[] => {
  const { data: books = {} } = useSWR<{ [b: string]: string }>('/api/index.json')
  const { dispatch } = useContext(BooksContext)
  const bookNames = Object.entries(books)
  const candidates: string[] = []

  useEffect(() => {
    dispatch({ type: 'LOAD_BOOKS', payload: books })
  }, [books, dispatch])

  if (book.parts.length > 0) {
    bookNames?.forEach(([key, bookName]) => {
      for (const part of book.parts) {
        if (!bookName.toLowerCase().includes(part.toLowerCase()) && !key.toLowerCase().includes(part.toLowerCase())) {
          return
        }
      }
      candidates.push(key)
    })
  }

  return candidates
}

const createVerseList = (from: number, to: number): number[] => {
  const verseList = [] as number[]

  for (let i = Math.min(from, to); i <= Math.max(from, to); i++) {
    verseList.push(i)
  }

  return verseList
}

type VersesResult = {
  chapter: string
  verses: {
    [verse: number]: string
  }
}

export const useVerses = (verseRef: ReferencePartType, bookName: string, version: string): VersesResult => {
  const { data } = useSWR(() => `/api/${version}/${bookName}`)
  const [chapter, verse] = verseRef.value.split('.')
  const [start, end] = verse.split('-').map((n) => parseInt(n))
  const verseList = createVerseList(start, end || start)
  const chapterNum = parseInt(chapter)
  const verses = data?.[chapterNum - 1]?.[chapterNum]

  const filteredVerses =
    verses &&
    Object.keys(verses).reduce((acc, verse) => {
      const verseNum = parseInt(verse)
      if (verseList.includes(verseNum)) {
        acc[verseNum] = verses[verseNum]
      }
      return acc
    }, {} as { [verse: number]: string })

  return {
    chapter,
    verses: filteredVerses,
  }
}
