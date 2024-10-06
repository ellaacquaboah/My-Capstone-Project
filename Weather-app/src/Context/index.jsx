import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState('London');
  const [thisLocation, setLocation] = useState('');

  // Function to get coordinates of a place
  const fetchLocation = async (city) => {
    const options = {
      method: 'GET',
      url: 'http://api.openweathermap.org/geo/1.0/direct',
      params: {
        q: city,
        limit: 1,
        appid: 'd272d6d83fdeaab0d2ded86210479d2b',
      },
    };

    try {
      const response = await axios.request(options);
      const locationData = response.data[0];
      return {
        name: locationData.name,
        lon: locationData.lon,
        lat: locationData.lat,
      };
    } catch (e) {
      console.error(e);
      alert('Error getting coordinates');
      return null;
    }
  };

  const fetchWeather = async (location) => {
    const options = {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/weather',
      params: {
        lat: location.lat,
        lon: location.lon,
        units: 'metric',
        appid: 'd272d6d83fdeaab0d2ded86210479d2b',
      },
    };

    try {
      const response = await axios.request(options);
      console.log('Weather Data: ', response.data);
      setLocation(response.data.name);
      setWeather(response.data);
    } catch (e) {
      console.error(e);
      alert('This place does not exist');
    }
  };

  useEffect(() => {
    const updateWeather = async () => {
      const location = await fetchLocation(place);
      if (location) {
        await fetchWeather(location);
      }
    };
    updateWeather();
  }, [place]);

  return (
    <StateContext.Provider value={{ weather, setPlace, values, thisLocation, place }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
