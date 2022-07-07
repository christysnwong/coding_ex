import { useEffect, useState } from 'react';
import axios from "axios";

// localStorage.clear();

const useFlip = (initialState = true) => {
    const [state, setState] = useState(initialState);
    const flipState = () => {
        setState(state => !state)
    }
    return [state, flipState]

}

// method 1
// const useAxios = (baseUrl) => {
//   const [resp, setResp] = useState([]);
//   const [error, setError] = useState(null);
//   // const [isLoading, setIsLoading] = useState(true);

//   const addRespData = async (restUrl) => {
//     try {
//       const response = await axios.get(`${baseUrl}${restUrl}`);
//     //   setResp(response.data);
//     //   console.log("addResp", response.data);
//       // setResp((data) => [...data, response.data]);

//       return response.data;
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return [resp, addRespData, error];
// };

// method 2
const useAxios = (key, baseUrl) => {
    // const [resp, setResp] = useState([]);
    const [resp, setResp] = useLocalStorage(key);
    
    const addRespData = async(formatFunc, restUrl="") => {
        try {
            const response = await axios.get(`${baseUrl}${restUrl}`);
            setResp((data) => [...data, formatFunc(response.data)]);
            
        } catch (err) {
            console.log(err);
        }
        
    }
    
    const clearRespData = () => setResp([]);
    
    return [resp, addRespData, clearRespData]

}

const useLocalStorage = (key, initialValue = []) => {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];

}

export { useFlip, useAxios, useLocalStorage };
