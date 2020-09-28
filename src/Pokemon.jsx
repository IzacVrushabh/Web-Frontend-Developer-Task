import React, { useEffect, useState } from "react";
import { AppBar } from "@material-ui/core";
import axios from "axios";
import Loader from "react-loader-spinner";
import FilterSort from "./FilterSort";
import DeleteIcon from "@material-ui/icons/Delete";

const Pokemon = (props) => {
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const allPokeList = [];
  
  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10`).then((response) => {
      const { data } = response;
      const { results } = data;
      setPokemonData(results);
      console.log(results);

      results.forEach((ele, idx) => {
       axios
          .get(`${ele.url}`)
          .then((res) => {
            // console.log(res);
            allPokeList.push({
                id: res.data.id,
                name: res.data.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  idx + 1
                }.png`,
                weight: res.data.weight,
                height: res.data.height,
                moves: res.data.moves.length,
            });
          })
          .catch((err) => console.log(err));
      });
      console.log(allPokeList);

      // const cnt = results.length;
      // setCount(cnt);
      setLoading(false);
    });
  }, []);

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
            {pokemonData.map((item, idx) => {
              const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                idx + 1
              }.png`;
              // const { id, name, sprite } = item;
              return (
                <tr key={idx + 1} className="d-block ">
                  <td>
                    <div className="card mb-3" style={{ maxWidth: "100vw" }}>
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img src={sprite} className="card-img" alt={sprite} />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ textTransform: "uppercase" }}
                            >{`${idx + 1} - ${item.name}`}</h5>
                            <p className="card-text">
                              <b
                                style={{ textTransform: "uppercase" }}
                              >{`${item.name}`}</b>
                              , also known as Pocket Monsters in Japan, is a
                              Japanese media franchise managed by the Pokémon
                              Company, a company founded by Nintendo, Game
                              Freak, and Creatures
                            </p>
                            <p className="card-text">
                              <button
                                type="button"
                                className="btn btn-warning w-25"
                                onClick={() => history.push(`/${idx + 1}`)}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning w-25 ml-3"
                                onClick={() => {
                                  setPokemonData((curCard) =>
                                    curCard.filter((x) => x.name !== item.name)
                                  );
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default Pokemon;
