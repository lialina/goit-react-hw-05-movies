import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import { fetchQueryMovies } from '../../services/movies-api';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const queryInputId = shortid.generate();

  const handleFormSubmit = query => {
    setQuery(query);
    setMovies([]);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    fetchQueryMovies(query)
      .then(result => console.log(result));
  }, [query])

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Please, enter your query');
      return;
    }

    handleFormSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };



  return (
    <form onSubmit={handleSubmit}> 
      <input 
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="query"
        value={query}
        onChange={handleChange}
        id={queryInputId}
      />
      <button type="submit">Search</button>
    </form>

    // <div>Hi, I'm MoviesPage</div>
  )
}
