import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/movies-api';
import SearchError from '../../components/SearchError/SearchError';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage() {
  // const { url } = useRouteMatch();
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  // const query = 'dog';

  useEffect(() => {
    fetchTrendingMovies()
    .then(data => data.results)
    .then(results => {
      setTrendingMovies(results);
      setStatus(Status.RESOLVED);
    })
    .catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    })
  }, [])
  
  return (
  <div>
    <h1>Hi, I am HomePage</h1>
    <h2>Trending today</h2>
    <div>
      {status === Status.REJECTED && <SearchError message={error.message} />}
      {status === Status.RESOLVED && <ul>{trendingMovies.map((movie) => 
        <li key={movie.id}>
          <Link to={`movies/${movie.id}`}>{movie.title}</Link>
        </li>)}
      </ul>}
    </div>
  </div>
  );
}
