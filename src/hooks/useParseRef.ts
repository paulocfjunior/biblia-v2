export type ReferencePartType = {
  value: string
  parts: string[]
}

export type DetailedReference = {
  book: ReferencePartType
  verse: ReferencePartType
}

const EMPTY_REFERENCE = {
  book: {
    parts: [],
    value: '',
  },
  verse: {
    parts: [],
    value: '',
  },
} as DetailedReference

export const useParseRef = (query = ''): DetailedReference => {
  const parts = query.split(' ').filter((p) => !!p)
  const bookParts = []
  const verseParts = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]

    if (part.includes('.')) {
      verseParts.push(part)
    } else if ((!isNaN(part as any) && i === 0) || isNaN(part as any)) {
      bookParts.push(part)
    }
  }

  if (!bookParts.length || !verseParts.length) {
    return EMPTY_REFERENCE
  }

  return {
    book: {
      value: bookParts.join(' '),
      parts: bookParts,
    },
    verse: {
      value: verseParts.join(' '),
      parts: verseParts,
    },
  }
}
