import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import { fetchQueryMovies } from '../../services/movies-api';
import SearchError from '../../components/SearchError/SearchError';
import { Link } from 'react-router-dom';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('')
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const queryInputId = shortid.generate();

  const handleChange = event => {
    setStatus(Status.IDLE);
    setInput(event.currentTarget.value.toLowerCase());
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (input.trim() === '') {
      toast.error('Please, enter your query');
      return;
    }
    setQuery(input);
    reset();
  };

  const reset = () => {
    setInput('');
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    fetchQueryMovies(query)
      .then(data => data.results)
      .then(results => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [query])


  return (
    <>
    <form onSubmit={handleSubmit}> 
      <input 
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="input"
        value={input}
        onChange={handleChange}
        id={queryInputId}
      />
      <button type="submit">Search</button>
    </form>

    {status === Status.REJECTED && <SearchError message={error.message} />}
    {status === Status.RESOLVED && 
    <ul>
      {movies.map((movie) =>
      <li key={movie.id}>
        <Link to={`movies/${movie.id}`}>
        {movie.title} {movie.release_date && <>({movie.release_date.slice(0, 4)})</>}
          </Link>
        </li>)}
    </ul>
    }
    
    <ToastContainer autoClose={5000} />
    </>

    
    // <div>Hi, I'm MoviesPage</div>
  )
}
