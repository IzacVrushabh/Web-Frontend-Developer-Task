import React, { useEffect, useState } from "react";
import { AppBar } from "@material-ui/core";
import axios from "axios";
import Loader from "react-loader-spinner";
import FilterSort from "./FilterSort";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { Toolbar, TextField } from "@material-ui/core";

const base_url = "https://pokeapi.co/api/v2/pokemon?limit=";

const Pokemon = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [pokemonData, setPokemonData] = useState({
    details: details, // details are not field in this details object..
    filter_list: "",
    sort: "",
  });

  //works on array..

  useEffect(() => {
    setLoading(true);
    axios.get(`${base_url}50`).then((response) => {
      const { data } = response;
      const { results } = data;
      // setPokemonData(results);
      console.log(results);

      results.forEach((ele, idx) => {
        axios
          .get(`${ele.url}`)
          .then((res) => {
            // console.log(res.data);
            setDetails((oldlist) => [
              ...oldlist,
              {
                id: res.data.id,
                name: res.data.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  idx + 1
                }.png`,
                weight: res.data.weight,
                order: res.data.order,
                types: res.data.types.length,
              },
            ]);
          })
          .catch((err) => console.log(err));
      });
      console.log(details);

      const cnt = details.length;
      console.log(cnt);
      setLoading(false);
    });
  }, []);

  //Need proper implementation
  const sortPokemon = (event) => {
    const sort = event.target.value;
    // console.log(event.target.value);
    //
    setPokemonData((val) => ({
      sort: sort,
      details: val.details
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.weight > b.weight
              ? 1
              : -1
            : sort === "highest"
            ? a.weight < b.weight
              ? 1
              : -1
            : a.id < b.id
            ? 1
            : -1
        ),
    }));
    setDetails([pokemonData.details]);
  };

  //Need proper implementation
  //works on implemenrstation
  const filterPokemon = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      setPokemonData({ filter_list: event.target.value, details: details });
    } else {
      setPokemonData({
        filter_list: event.target.value,
        details: details.filter((val) => val.types > 0),
      });
    }
    setDetails([pokemonData.details]);
  };

  const handleSearchChange = (e) => {
    setPokemonData({
      filter_list: e.target.value,
    });
  };

  return (
    <>
      <div>
        <AppBar
          className="mt-2"
          position="sticky"
          style={{ borderRadius: "10px", background: "#FFB800" }}
        >
          <div className="nav_bar my-2 d-block mx-auto">
            <h3>POKEMON API</h3>
          </div>
          <Toolbar>
            <div>
              <SearchIcon />
              <TextField
                className="Search"
                onChange={handleSearchChange}
                label="Pokemon"
                variant="standard"
              />
            </div>
          </Toolbar>
          <div className="d-flex ">
            <FilterSort
              count={details.length}
              filter_list={pokemonData.filter_list}
              sort={pokemonData.sort}
              sortPokemon={sortPokemon}
              filterPokemon={filterPokemon}
            />
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
              {details.map((item) => {
                const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`;
                // const { id, name, sprite } = item;
                return (
                  <tr key={item.id} className="d-block">
                    <td>
                      <div
                        className="card mb-3"
                        style={{ maxWidth: "100vw", background: "#FFF8DE" }}
                      >
                        <div className="row no-gutters">
                          <div
                            className="col-md-4 my-3"
                            style={{ borderRight: "5px solid #FFB800" }}
                          >
                            <img
                              src={sprite}
                              className="card-img"
                              alt={sprite}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body mt-2">
                              <h5
                                className="card-title"
                                style={{ textTransform: "uppercase" }}
                              >{`${item.id} - ${item.name}`}</h5>
                              <p className="card-text">
                                <b
                                  style={{ textTransform: "uppercase" }}
                                >{`${item.name}`}</b>
                                Pokemon Description
                              </p>
                              <p className="card-text">
                                <button
                                  type="button"
                                  className="btn btn-warning w-25 text-white font-weight-bold "
                                  onClick={() => history.push(`/${item.id}`)}
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-warning w-25 text-white ml-3"
                                  onClick={() => {
                                    setDetails((curCard) =>
                                      curCard.filter((x) => x.id !== item.id)
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
      </div>
    </>
  );
};
export default Pokemon;
