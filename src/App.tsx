import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Control from './pages/Control'
import Verse from './pages/Verse'
import Menu from './pages/Menu'
import { StateProvider as BooksProvider } from './contexts/books'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: NunitoSans;
    src: url("/fonts/Nunito_Sans/NunitoSans-Regular.ttf");
  }
`

const PageLoader: React.FC = () => <div>Loading</div>

const NotFound: React.FC = () => <div>Esta página não foi encontrada</div>

const Routes: React.FC = () => (
  <React.Suspense fallback={<PageLoader />}>
    <Switch>
      <Route path="/control" component={Control} />
      <Route path="/verse" component={Verse} />
      <Route exact path="/" component={Menu} />
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
