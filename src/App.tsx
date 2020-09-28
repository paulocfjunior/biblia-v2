import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Control from './pages/Control'
import Verse from './pages/Verse'
import { StateProvider as BooksProvider } from './contexts/books'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: NunitoSans;
    src: url("/fonts/Nunito_Sans/NunitoSans-Regular.ttf");
  }

  @font-face {
    font-family: NunitoSans;
    font-weight: bold;
    src: url("/fonts/Nunito_Sans/NunitoSans-Bold.ttf");
  }

  @font-face {
    font-family: Lora;
    src: url("/fonts/Lora/Lora-Regular.ttf");
  }
`

const PageLoader: React.FC = () => <div>Loading</div>

const NotFound: React.FC = () => <div>Esta página não foi encontrada</div>

const Routes: React.FC = () => (
  <React.Suspense fallback={<PageLoader />}>
    <Switch>
      <Route path="/control" component={Control} />
      <Route path="/verse" component={Verse} />
      <Redirect exact from="/" to="/control" />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </React.Suspense>
)

const App: React.FC = () => (
  <BooksProvider>
    <>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </>
  </BooksProvider>
)

export default App
