import React ,{ useEffect } from 'react'
import axios from "axios"

const Pokemon = () => {
    
    useEffect(()=>{
     axios.get("https://pokeapi.co/api/v2/pokemon/")
     .then(res=>{
         console.log(res.data);
     })
     .catch(err=>console.log(err));
    },[])

    return (
        <>
        <div className="pokemon_section"></div>
           <h1 className="text-warning"> Content</h1> 
        </>
    )
}

export default Pokemon
