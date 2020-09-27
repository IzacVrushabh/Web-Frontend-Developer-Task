import React, { useEffect, useState } from "react";
import { div, Link } from "@material-ui/core";
import axios from "axios";
import Loader from "react-loader-spinner";

const Pokemon_Detail = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemon_id } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
        setLoading(false);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemon_id]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <div className="container mt-3" style={{background:"#FFB800",borderRadius:"10px",height:"90vh"}}>
          <header>
          <h3 className="pt-3">
            {`${id}. `}
            {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
            </h3>
          </header>
          {loading?<Loader
          type="ThreeDots"
          color="white"
        />:<img
            style={{ width: "300px", height: "300px" }}
            src={fullImageUrl}
            alt={fullImageUrl}
          />}
          
          <div><h4>Pokemon Details</h4></div>
          <div>
            {"Species: "}
            <Link href={species.url}>{species.name} </Link>
          </div>
          <div>Height: {height} </div>
          <div>Weight: {weight} </div>
          <div><h6>Types:</h6>
          {types.map((typeInfo) => {
            return <div key={typeInfo.type.name}> {`${typeInfo.type.name}`}</div>;
          })}
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
