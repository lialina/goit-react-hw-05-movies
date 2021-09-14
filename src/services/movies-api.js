const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '531a27e0122c94d8ab2e66598c1071a6';

async function fetchWithErrorHandling(url = '', config ={}) {
  const response = await fetch(url, config);
  return response.ok 
    ? await response.json() 
    : new Error('Possibly server error, please try again');
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function fetchQueryMovies(query) {
  return fetchWithErrorHandling(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
}

export function fetchMovieDetailsById(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
}

export function fetchMovieActors(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
}


// export const fetchMovies = async function() {
//   return fetch(
//     `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     };

//     return Promise.reject(
//       new Error('Possibly server error, please try again'),
//     );
//   });
// };