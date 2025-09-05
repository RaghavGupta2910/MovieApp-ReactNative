import { useEffect, useState } from "react";
import { TMDB_CONFIG } from "./api";
// import { MovieDetails } from "@/app/movies/[id]"

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) =>{
    const [data, setData] = useState<T | null>(null);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async() =>{
        try{
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);            
        }catch(err){
            //@ts-ignore
            setError(err instanceof Error ? err : new Error("Error has occured"));
        }finally{
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() =>{
        if(autoFetch){
            fetchData();
        }
    }, [])

    return {data, loading, error, refetch: fetchData, reset};
}

export const fetchMovieDetails = async(movieId: string) : Promise<MovieDetails> => {
    try{
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}&language=en-US`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        })
        if(!response.ok){
            throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        return data;

    } catch(error){
        console.log(error);
        throw error;
    }
}

export default useFetch;