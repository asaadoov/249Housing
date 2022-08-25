import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async url => {
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '5c2dd9eb87msh2873f68cdea98d2p1dad47jsn9652feadce3f',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    })

    return data
}