const BASE_URL = 'https://pixabay.com/api/';
const KEY = '28534980-72fa9e677fedce536401f44b4';

const api = (searchImage, page) => {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${searchImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  ).then(response => response.json());
};
export default api;
