import React, {useState, useEffect} from 'react'
import {View,Text} from 'react-native'
// import { Axios } from 'react-native-axios'
import axios from 'axios'

const useFetch = ()=>{

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async()=>{
        setIsLoading(true)

        try{    
            // const response = await axios.get('http://localhost:3001/api/products')
            const response = await axios.get( 'http://10.0.2.2:3001/api/products')
            setData(response.data)
            setIsLoading(false)
            // console.log(response)
            // console.log(response.data)

        }catch(error){
            setError(error)
            console.log('Fetch Error:', error); // Log the error for debugging purposes
        }finally{
            setIsLoading(false)
        }

    }

    useEffect(()=>{
        fetchData()
    },[])


    const refetch = ()=>{
        setIsLoading(true)
        fetchData()
    }


    return {data, isLoading,error,refetch}
}



export default useFetch