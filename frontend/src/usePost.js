import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 */
export default function usePost(url, initialState = null, parameter) {

    const [data, setData] = useState(initialState);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.post(url,parameter);
                setData(response.data);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    return { data, isLoading, error };
}