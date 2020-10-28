import React from "react";

const FilterSort = (props) => {
  //Need Proper implementation...
  //work on it...
  //watch some videos...
  return (
    <>
      <div className="col-md-4 w-50">
        <label className="d-flex">
          Sort by
          <select value={props.sort} onChange={props.sortPokemon} className="ml-2">
            <option value="">Select</option>
            <option value="lowest">Lowest to highest</option>
            <option value="highest">Highest to lowest</option>
          </select>
        </label>
      </div>

      <div className="col-md-4 w-50 ml-3">
        <label className="d-flex">
        Filter
          <select value={props.filter_list} onChange={props.filterPokemon} className="ml-2">
            <option value="">ALL</option>
            <option value="height">Height</option>
            <option value="types">Types</option>
            <option value="moves">Moves</option>
          </select>
        </label>
      </div>
      <div className="filter-result"><h3> {props.count} Pokemons</h3></div>
    </>
  );
};

export default FilterSort;
