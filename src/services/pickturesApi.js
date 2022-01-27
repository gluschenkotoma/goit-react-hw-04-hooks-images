import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '22755596-bd5bc4dc11dbf7c870dedd292';

export const getPictures = async ({ searchQuery, pageNumber }) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(response);
  return response.data;
};
