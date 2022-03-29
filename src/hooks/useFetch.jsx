import {useEffect,useState} from 'react'

export function useFetch(url) {

    const [getExe, setData] = useState([]);
    
    const [error, setError] = useState(false)
    
    
    
    useEffect(() => {
    
        if (!url) return
    
        async function fetchData() {
    
        try {
    
        const response = await fetch(url)
    
        const data = await response.json()
    
        setData(data)
    
        } catch (err) {
    
        console.log(err)
    
        setError(true)
    
        }
        }
    
        fetchData()
    
        }, [url])
    
        return { getExe }
    
}