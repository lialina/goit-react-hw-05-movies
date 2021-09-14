import { useState, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch, NavLink } from 'react-router-dom';
import { fetchMovieDetailsById, fetchMovieActors } from '../../services/movies-api';
import SearchError from '../SearchError/SearchError';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] =  useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieDetailsById(movieId)
    .then(result => {
      setMovie(result);
      setStatus(Status.RESOLVED);
    })
    .catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    });
  }, [movieId]);

  return (
    <>
    <Link to="/">Go back</Link>
    <h2>Я страничка с детальным описанием фильма ${movieId}</h2>
    {status === Status.REJECTED && <SearchError message={error.message} />}
    {status === Status.RESOLVED &&
    <>
      <div>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Movie poster" width={250}/>
        <h3>{movie.title}</h3>
        <p>User Score: %</p>
        <h4>Overview</h4>
        <p>{movie.overview}</p>
        <h5>Genres</h5>
        <ul>{movie.genres.map((genre) =>
          <li key={genre.id}>{genre.name}</li>
        )}</ul>
      </div>
      <hr />

      <div>
        <p>Additional information</p>
        <ul>
          <li><NavLink to={`${url}/cast`}>Cast</NavLink></li>
          <li><NavLink to={`${url}/reviews`}>Reviews</NavLink></li>
        </ul>
      </div>
      </>
    }

    <Route path={`${path}/:movieId/cast`}>
      <Cast />
    </Route>  

    <Route path={`${path}/:movieId/reviews`}>
      <Reviews />
    </Route> 
    </>
  );
}