import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/movies-api';
import SearchError from '../SearchError/SearchError';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  EMPTY: 'empty',
  REJECTED: 'rejected',
};

export default function Reviews() {
  const {movieId} = useParams();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
    .then(data => data.results)
    .then(results => {
      if (results.length === 0) {
        setStatus(Status.EMPTY);
        return;
      }
      console.log(results);
      setReviews(results);
      setStatus(Status.RESOLVED);
    })
    .catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    });
  }, [movieId]);

  return (
    <>
      {status === Status.REJECTED && <SearchError message={error.message} />}
      
      {status === Status.EMPTY && 
      <div>We don't have any reviews for this movie</div>}

      {status === Status.RESOLVED && 
      <ul>
        {reviews.map((review) => 
        <li key={review.id}>
          <p>Author: {review.author}</p>
          <p>{review.content}</p>
        </li>)}
        </ul>
      // <div>It is Reviews of Movie with ID #{movieId}</div>
      }
    </>
  )
  
}