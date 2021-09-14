import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieActors } from '../../services/movies-api';
import SearchError from '../SearchError/SearchError';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Cast() {
  const {movieId} = useParams();
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  console.log(cast);

  useEffect(() => {
    fetchMovieActors(movieId)
    .then(result => {
      setCast(result);
      // setStatus(Status.RESOLVED);
      console.log(result);
    })
    .catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    });
  }, []);

  return (
    <>
      {status === Status.REJECTED && <SearchError message={error.message} />}
      {/* {cast && 
      <ul>
      {cast.map((actor) => {
      <li>{actor.id}</li>
      })}
      </ul>} */}
      
      <>It is Cast of Movie with ID #{movieId}</>
    </>
  )
  
}