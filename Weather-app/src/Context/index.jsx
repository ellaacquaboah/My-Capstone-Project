import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Accra')
    const [thisLocation, setLocation] = useState('')

    // fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                lat:45.133,
                lon:7.367,
                appid:"d272d6d83fdeaab0d2ded86210479d2b"
            },
            headers: {
                
            }
        }

        try {
            const response = await axios.request(options);
            console.log(response.data)
            setLocation(response.name)
            //setValues(thisData.values)
           // setWeather(thisData.values[0])
        } catch (e) {
            console.error(e);
            // if the api throws error.
            alert('This place does not exist')
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)