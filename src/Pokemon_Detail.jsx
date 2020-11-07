import React, { useEffect, useState } from "react";
import { Link } from "@material-ui/core";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";

const Pokemon_Detail = (props) => {
  const { pokemon_id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);

  //use graphs and charts to display pokemon details..
  //use redux
  //work on react+redux
  //add apis
  
  useEffect(() => {
    setLoading(true);
    //use different api...
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
        setLoading(false);
        // valid response
      })
      .catch((err) => {
        console.log(err);
        // some error
        setPokemon(false);
      });
  }, [pokemon_id]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    return (
      <>
        <div
          className="container mt-3"
          style={{
            background: "#FEC200",
            borderRadius: "10px",
            height: "90vh",
          }}
        >
          <div className="d-block mx-auto w-25">
            <header>
              <h3 className="pt-3">
                {`${id}. `}
                {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
              </h3>
            </header>
            {loading ? (
              <Loader type="ThreeDots" color="white" />
            ) : (
              <img
                className="mt-4"
                style={{ width: "300px", height: "300px" }}
                src={fullImageUrl}
                alt={fullImageUrl}
              />
            )}

            <div className="mt-4">
              <h4>Pokemon Details</h4>
            </div>
            <div>
              Species:
              <Link href={species.url} className="ml-2">
                {species.name.charAt(0).toUpperCase() + name.slice(1)}{" "}
              </Link>
            </div>
            <div> Height: {height} </div>
            <div> Weight: {weight} </div>
            <div className="d-flex">
              <h6 className="mr-2">Types:</h6>
              {types.map((typeInfo) => {
                return (
                  <div key={typeInfo.type.name} className="mr-2">
                    
                    {`${typeInfo.type.name}`}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && (
        <Loader
          type="ThreeDots"
          color="#FFB800"
          height="100"
          width="100"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <div> Pokemon not found</div>}
    </>
  );
};
export default Pokemon_Detail;
