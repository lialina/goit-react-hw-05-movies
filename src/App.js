import { Route } from 'react-router-dom';
import Container from './components/Container/Container';
import Navigation from './components/Navigation/Navigation';
import HomePage from './views/HomePage';
// import './App.css';

function App() {
  return (
  <Container>
    <Navigation />

    <Route path="/">
      <HomePage />
    </Route>
  </Container>
  );
}

export default App;
