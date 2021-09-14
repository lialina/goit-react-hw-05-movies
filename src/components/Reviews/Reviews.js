import { useParams } from 'react-router-dom';

export default function Reviews() {
  const { movieId } = useParams();
  return <div>It is Reviews of Movie with ID #{movieId}</div>
}