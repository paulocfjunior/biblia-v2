import React, { createContext, Dispatch, useReducer } from 'react'

type BookType = {
  [name: string]: string
} | null

type ActionType = {
  type: string
  payload: BookType
}

interface ContextProps {
  state: BookType
  dispatch: Dispatch<ActionType>
}

const store = createContext({} as ContextProps)
const { Provider: BookProvider } = store

const StateProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer((state: BookType, action: ActionType) => {
    switch (action.type) {
      case 'LOAD_BOOKS':
        return action.payload
      default:
        return state
    }
  }, null)

  return <BookProvider value={{ state, dispatch }}>{children}</BookProvider>
}

export { store, StateProvider }
