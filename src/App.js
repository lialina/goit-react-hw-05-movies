import { Switch, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import Navigation from './components/Navigation/Navigation';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
import NotFoundView from './views/NotFoundView';
// import './App.css';

function App() {
  return (
  <Container>
    <Navigation />

    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/movies" exact>
        <MoviesPage />
      </Route>

      <Route path="/movies/:movieId">
        <MovieDetailsPage />
      </Route>

      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  </Container>
  );
}

export default App;
