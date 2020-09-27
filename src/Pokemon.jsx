import React, { useEffect, useState } from "react";
import { AppBar } from "@material-ui/core";
import axios from "axios";
import Loader from "react-loader-spinner";
import FilterSort from "./FilterSort";

const Pokemon = (props) => {
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  
  useEffect(() => {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
    .then((response) => {
      const { data } = response;
      const { results } = data;
      const newPokemonData = {};
      
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          url: pokemon.url,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
      });
      setPokemonData(newPokemonData);
      console.log(newPokemonData);
      setLoading(false);
      
      const allPokeList = {};
      results.forEach((ele, idx) => {
          axios.get(`${ele.url}`).then((res) => {
            allPokeList[idx + 1] = {
              id: res.data.id,
              order: res.data.order,
              weight: res.data.weight,
              height: res.data.height,
              moves: res.data.moves.length,
            };
          })
          .catch(err=>console.log(err));
        });
        setDetails(allPokeList);
        console.log(allPokeList);

        // const cnt = results.length;
        // setCount(cnt);
      });
  }, []);

  const get_Pokemon_Details = (pokemon_id) => {
    const { id, name, sprite } = pokemonData[pokemon_id];
    return (
      <tr key={pokemon_id} className="d-block ">
        <td>
          <div className="card mb-3" style={{ maxWidth: "100vw" }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={sprite} className="card-img" alt={sprite} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{`${id} - ${
                    name.charAt(0).toUpperCase() + name.slice(1)
                  }`}</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <button
                      type="button"
                      className="btn btn-warning w-25"
                      onClick={() => history.push(`/${id}`)}
                    >
                      View
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <AppBar
        className="mt-2"
        position="sticky"
        style={{ borderRadius: "10px", background: "#FFB800" }}
      >
        <div className="nav_bar ml-2 my-2">
          <h3>POKEMON API</h3>
        </div>
        <div className="d-flex ">
          <FilterSort />
        </div>
      </AppBar>
      {loading ? (
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
      ) : (
        <table className="mt-3 d-block mx-auto" style={{ width: "100vh" }}>
          <tbody>
            {Object.keys(pokemonData).map((pokemon_id) =>
              get_Pokemon_Details(pokemon_id)
            )}
          </tbody>
        </table>
      )}
    </>
  );
};
export default Pokemon;
