const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchAPI = async () => {
  try {
    const response = await fetch(URL);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchAPI;
