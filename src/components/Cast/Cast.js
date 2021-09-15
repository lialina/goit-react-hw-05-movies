/* eslint-disable jsx-a11y/img-redundant-alt */
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
    .then(result => result.cast)
    .then(cast => {
      setCast(cast);
      setStatus(Status.RESOLVED);
      console.log(cast);
    })
    .catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    });
  }, [movieId]);

  return (
    <>
      {status === Status.REJECTED && <SearchError message={error.message} />}
      {status === Status.RESOLVED && 
      <ul>
      {cast.map((actor) => 
      <li key={actor.id}>
        <ul>
          <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="Photo of the actor" width="120"/>
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </ul>
      </li>
      )}
      </ul>
      }
      

    </>
  )
  
}