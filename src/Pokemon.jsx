import React, { useEffect, useState } from "react";
import { AppBar } from "@material-ui/core";
import axios from "axios";
import Loader from "react-loader-spinner";

const Pokemon = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=30`)
      .then(function (response) {
        // const { data } = response;
        // const { results } = data;
        const newPokemonData = {};
        response.data.results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
        setLoading(false);
      });
    pokedetails();
  }, []);

  const pokedetails = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/1/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

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
                    <button type="button" className="btn btn-warning w-25">
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
          <div className="col-md-4 w-50">
            <label className="d-flex">
              Sort by
              <select className="form-control">
                <option value="">Select</option>
                <option value="lowestprice">Lowest to highest Order</option>
                <option value="highestprice">Highest to lowest Order</option>
                <option value="lowestheight">Lowest to highest Height</option>
                <option value="highestHeight">Highest to lowest Height</option>
              </select>
            </label>
          </div>

          <div className="col-md-4 w-50 ml-3">
            <label className="d-flex">
              Filter Size
              <select className="form-control">
                <option value="">ALL</option>
                <option value="x">Weight</option>
                <option value="s">Types</option>
              </select>
            </label>
          </div>
        </div>
      </AppBar>
      {!loading ? (
        <table className="mt-3 d-block mx-auto" style={{ width: "100vh" }}>
          <tbody>
            {Object.keys(pokemonData).map((pokemon_id) =>
              get_Pokemon_Details(pokemon_id)
            )}
          </tbody>
        </table>
      ) : (
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
    </>
  );
};
export default Pokemon;
